"use client";
import { useEffect } from "react";
import { useTelegram } from "../providers/telegram-provider";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const { webApp } = useTelegram();
  const router = useRouter();

  useEffect(() => {
    if (!webApp) return;
    webApp.BackButton.show();
    webApp.BackButton.onClick(() => {
      router.push("/");
      webApp.BackButton.hide();
    });
  }, [webApp, router]);

  return <></>;
}
