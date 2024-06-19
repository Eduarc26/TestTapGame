"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTelegram } from "../providers/telegram-provider";
import SwapIcon from "../icons/swap";
import EarnIcon from "../icons/earn";
import BoostIcon from "../icons/boost";

interface BottomNavigationProps {}
export default function BottomNavigation({}: BottomNavigationProps) {
  const { user, webApp } = useTelegram();
  const router = useRouter();
  if (!user || !webApp) return;

  return (
    <div
      className="flex-grow rounded-xl bg-white/10"
      style={{
        backdropFilter: "blur(30px)",
      }}
    >
      <div className="flex items-center h-full">
        <button
          onClick={() => toast.warning("Следите за нашим Телеграм каналом")}
          className="text-xs flex-1 grid place-items-center py-2"
        >
          <SwapIcon />
          <span className="mt-0.5">Свап</span>
        </button>
        <button
          onClick={() => router.push(`/earn/tasks`)}
          className="text-xs flex-1 grid place-items-center py-2"
        >
          <EarnIcon />
          <span className="mt-0.5">Задания</span>
        </button>
        <button
          onClick={() => router.push(`/boosts`)}
          className="text-xs flex-1 grid place-items-center py-2"
        >
          <BoostIcon />
          <span className="mt-0.5">Бусты</span>
        </button>
      </div>
    </div>
  );
}
