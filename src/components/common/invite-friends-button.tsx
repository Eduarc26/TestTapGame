"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTelegram } from "../providers/telegram-provider";
import { useSounds } from "@/hooks/use-sounds";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
const appName = process.env.NEXT_PUBLIC_APP_NAME;
const bot = process.env.NEXT_PUBLIC_BOT_USERNAME;
export default function InviteFriendsButton() {
  const [open, setOpen] = useState(false);
  const { user, webApp } = useTelegram();
  const { playMenuAudio } = useSounds();
  useEffect(() => {
    if (!open && webApp) {
      setTimeout(() => {
        webApp.MainButton.show();
      }, 300);
    }
  }, [open, webApp]);

  useEffect(() => {
    if (webApp && user) {
      webApp.MainButton.hide();
      webApp.MainButton.color = "#FFF";
      webApp.MainButton.setText("Пригласить друга 🔗");
      webApp.MainButton.textColor = "#000";
      webApp.MainButton.show();
      const handleMainButtonClick = () => {
        playMenuAudio();
        setOpen((prev) => !prev);
        webApp.MainButton.hide();
      };
      window.Telegram.WebApp.MainButton.onClick(handleMainButtonClick);

      return () => {
        webApp.MainButton.hide();
      };
    }
  }, [webApp, user, playMenuAudio]);

  useEffect(() => {
    const overflow = 100;
    if (open) {
      document.body.style.marginTop = "";
      document.body.style.height = "";
      document.body.style.paddingBottom = "";
    } else {
      document.body.style.marginTop = `${overflow}px`;
      document.body.style.height = window.innerHeight + overflow + "px";
      document.body.style.paddingBottom = `${overflow}px`;
      window.scrollTo(0, overflow);
    }

    return () => {
      // Очистка стилей при размонтировании
      document.body.style.marginTop = "";
      document.body.style.height = "";
      document.body.style.paddingBottom = "";
    };
  }, [open]);

  if (!user || !webApp?.viewportHeight) return;

  const sendLink = () => {
    const referralLink = `t.me/${bot}?start=${user.id}`;
    const message = `\nЗаходи в ${appName}, кликай и зарабатывай кристаллы для Brawl Stars! 💎`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, "_blank");
  };

  const copyLink = async () => {
    const referralLink = `t.me/${bot}?start=${user.id}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Ссылка успешно скопирована");
      setOpen(false);
      console.log("Text copied to clipboard successfully!");
    } catch (err) {
      toast.error("Произошла ошибка. Повторите попытку позже");
      setOpen(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={"bottom"}
          className="bg-primary p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle className="border-b border-border py-5">
              Пригласите друга
            </SheetTitle>
            <SheetDescription className="p-4  flex flex-col gap-5 ">
              <button
                className="bg-border text-white rounded-md py-3.5 text-[17px] select-none"
                onClick={sendLink}
              >
                Отправить
              </button>
              <button
                className="bg-border text-white rounded-md py-3.5 text-[17px]"
                onClick={copyLink}
              >
                Скопировать ссылку
              </button>
              <button
                className="text-white rounded-md py-3.5 text-[17px] mb-5"
                onClick={() => setOpen(false)}
              >
                Закрыть
              </button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
