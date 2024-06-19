"use client";

import { useTelegram } from "@/components/providers/telegram-provider";
import User from "@/dto/user";
import useUserStore from "@/storage/user-store";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useOptimisticUpdate from "./use-optimistic-update";
interface ClickEffect {
  id: number;
  top: number;
  left: number;
}

export default function useFarmButton() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const { webApp } = useTelegram();
  const { clicksLeft, user } = useUserStore();
  const { optimisticBalanceUpdate } = useOptimisticUpdate();
  const [buttonInactive, setButtonInactive] = useState(false);
  const [clicks, setClicks] = useState<ClickEffect[]>([]);

  const handlePressStart = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    let x, y;
    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 20;
    const rotateY = ((x - centerX) / centerX) * 20;

    setRotation({ x: rotateX, y: rotateY });
    setTimeout(() => {
      setRotation({ x: 0, y: 0 });
    }, 150);
  };

  const handlePressEnd = () => {
    setRotation({ x: 0, y: 0 });
  };

  const triggerVibro = () => {
    webApp?.HapticFeedback.impactOccurred("medium");
  };
  const handleControllerClick = (
    event: React.TouchEvent<HTMLButtonElement>
  ) => {
    if (clicksLeft <= 1) return;
    const rect = event.currentTarget.getBoundingClientRect();

    const processClick = (x: number, y: number) => {
      const newClick: ClickEffect = {
        id: Date.now(),
        top: y,
        left: x,
      };

      setClicks((prevClicks) => [...prevClicks, newClick]);
    };
    Array.from(event.changedTouches).forEach((touch) => {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      processClick(x, y);
      triggerVibro();
      optimisticBalanceUpdate();
    });
  };

  return {
    handlePressStart,
    handlePressEnd,
    triggerVibro,
    clicks,
    rotation,
    inactive: buttonInactive,
    handleControllerClick,
  };
}
