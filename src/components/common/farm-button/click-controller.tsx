"use client";
import React, { useRef } from "react";
import ClickView from "./click-view";
import FarmButtonSkin from "./button-skin";
import { useTelegram } from "@/components/providers/telegram-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import useFarmButton from "@/hooks/use-farm-button";
import useUserStore from "@/storage/user-store";

interface FarmButtonControllerProps {}

export default function FarmButtonController({}: FarmButtonControllerProps) {
  const controller = useRef<HTMLButtonElement>(null);
  const { webApp } = useTelegram();
  const { user, clicksLeft } = useUserStore();
  const { clicks, rotation, handleControllerClick, handlePressStart } =
    useFarmButton();

  if (!user) return;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        perspective: "1000px",
      }}
    >
      <motion.button
        initial={{
          scale: 0.5,
        }}
        animate={{
          scale: 1,
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        id="farm-button"
        transition={{ duration: 0.3 }}
        ref={controller}
        disabled={clicksLeft < 1}
        className={cn(
          "mx-auto rounded-full grid place-items-center mt-20 select-none size-[300px] disabled:opacity-60",
          webApp?.platform === "tdesktop" && "mt-12"
        )}
        onClick={handlePressStart}
        onTouchStart={handleControllerClick}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center",
        }}
      >
        <FarmButtonSkin variant="default" />
        {clicks.map((click) => (
          <ClickView
            key={click.id}
            position={{ top: click.top, left: click.left }}
            count={user?.perClick ?? 1}
          />
        ))}
      </motion.button>
    </div>
  );
}
