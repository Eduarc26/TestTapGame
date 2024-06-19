"use client";

import { useEffect } from "react";
import { useTelegram } from "../providers/telegram-provider";
const appName = process.env.NEXT_PUBLIC_APP_NAME;
const bot = process.env.NEXT_PUBLIC_BOT_USERNAME;
export default function InviteFriendsButton() {
  const { user, webApp } = useTelegram();

  useEffect(() => {
    if (webApp && user) {
      webApp.MainButton.hide();
      webApp.MainButton.color = "#FFF";
      webApp.MainButton.setText("Пригласить друга 🔗");
      webApp.MainButton.textColor = "#000";
      webApp.MainButton.show();
      const handleMainButtonClick = () => {
        const referralLink = `t.me/${bot}?start=${user.id}`;
        const message = `Заходи в ${appName} и погнали зарабатывать вместе!🌟`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
          referralLink
        )}&text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, "_blank");
      };
      window.Telegram.WebApp.MainButton.onClick(handleMainButtonClick);

      return () => {
        webApp.MainButton.hide();
      };
    }
  }, [webApp, user]);

  if (!user || !webApp?.viewportHeight) return;

  return null;
}
