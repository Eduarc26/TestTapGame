"use client";
import { useEffect } from "react";
import { useTelegram } from "../providers/telegram-provider";
import { useRouter } from "next/navigation";
import { useSounds } from "@/hooks/use-sounds";

export default function BackButton() {
  const { webApp } = useTelegram();
  const { playBackAudio } = useSounds();
  const router = useRouter();

  useEffect(() => {
    if (!webApp) return;
    webApp.BackButton.show();
    webApp.BackButton.onClick(() => {
      playBackAudio();
      router.push("/");
      webApp.BackButton.hide();
    });
  }, [webApp, router, playBackAudio]);

  return <></>;
}
