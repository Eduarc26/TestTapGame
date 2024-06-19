"use client";
import Image from "next/image";
import ClickProgressButton from "./farm-button/click-progress-button";
import useUserStore from "@/storage/user-store";
import { useTelegram } from "../providers/telegram-provider";
import BottomNavigation from "./bottom-navigation";

export default function ClickProgress() {
  const { user, clicksLeft } = useUserStore();
  const { webApp } = useTelegram();
  if (!webApp) return;

  return (
    <div
      className="mt-12 px-6 fixed bg-transparent left-0 z-50 w-full -translate-y-[168px] pt-2"
      style={{
        top: webApp.viewportStableHeight,
      }}
    >
      <div className="flex gap-10 items-center">
        <div className="flex items-center space-x-1 w-16">
          <span className="select-none size-6 flex-shrink-0">
            <Image
              src={"/icons/voltage.svg"}
              width={24}
              height={24}
              alt="battery"
            />
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-lg">
              {clicksLeft === 1 ? "0" : clicksLeft}
            </span>
            <span className="text-[10px] text-gray-400 relative -top-1">
              / {user?.clickLimit}
            </span>
          </div>
        </div>
        <BottomNavigation />
      </div>
      <ClickProgressButton />
    </div>
  );
}
