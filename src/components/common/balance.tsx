"use client";
import { Poppins, Lilita_One } from "next/font/google";
import useUserStore from "@/storage/user-store";
import { cn, formattedBalance } from "@/lib/utils";
import { useTelegram } from "../providers/telegram-provider";
import Gem from "../icons/gem";

const lilita = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Balance() {
  const { webApp } = useTelegram();
  const { user } = useUserStore();
  if (!user) return null;
  return (
    <div
      className={cn(
        "text-4xl font-bold flex items-center w-fit mx-auto space-x-2 text-white/90 ordinal slashed-zero tabular-nums ",
        lilita.className,
        webApp?.platform === "tdesktop" && "mt-12"
      )}
    >
      {/* Lorem, ipsum. {webApp?.platform desktop} */}
      <Gem size={30} />
      <span className="tracking-wide">{formattedBalance(user.balance)}</span>
    </div>
  );
}
