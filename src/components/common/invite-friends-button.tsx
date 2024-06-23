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
import { motion } from "framer-motion";
const appName = process.env.NEXT_PUBLIC_APP_NAME;
const bot = process.env.NEXT_PUBLIC_BOT_USERNAME;
export default function InviteFriendsButton() {
  const [open, setOpen] = useState(false);
  const { user, webApp } = useTelegram();
  const { playMenuAudio } = useSounds();
  // useEffect(() => {
  //   if (!open && webApp) {
  //     setTimeout(() => {
  //       webApp.MainButton.show();
  //     }, 300);
  //   }
  // }, [open, webApp]);

  useEffect(() => {
    if (webApp && user) {
      // webApp.MainButton.hide();
      // webApp.MainButton.color = "#FFF";
      // webApp.MainButton.setText("Пригласить друга 🔗");
      // webApp.MainButton.textColor = "#000";
      // webApp.MainButton.show();
      const handleMainButtonClick = () => {
        playMenuAudio();
        setOpen((prev) => !prev);
        webApp.MainButton.hide();
      };
      // window.Telegram.WebApp.MainButton.onClick(handleMainButtonClick);

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

    // return () => {
    //   document.body.style.marginTop = `${overflow}px`;
    //   document.body.style.height = window.innerHeight + overflow + "px";
    //   document.body.style.paddingBottom = `${overflow}px`;
    //   window.scrollTo(0, overflow);
    // };
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

      <motion.div
        className="w-full fixed top-full h-[92px] bg-[#1a1a1a] left-0 -translate-y-full pt-2 px-4"
        initial={{ y: "100%" }}
        animate={{ y: open ? "100%" : "-92px" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setOpen(true)}
          className="w-full bg-white text-black py-[25px] rounded-xl text-lg active:bg-white active:opacity-90"
        >
          Пригласить друга 🔗
        </Button>
      </motion.div>
    </>
  );
}
