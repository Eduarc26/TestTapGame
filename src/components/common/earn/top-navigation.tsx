"use client";
import { useTelegram } from "@/components/providers/telegram-provider";
import { useSounds } from "@/hooks/use-sounds";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface TopNavigationProps {
  active: "tasks" | "frends";
}

export default function TopNavigation({ active }: TopNavigationProps) {
  const { user } = useTelegram();
  const { playMenuAudio } = useSounds();
  return (
    <div className="bg-primary rounded-md p-1 flex">
      <Link
        href={"/earn/tasks"}
        onClick={playMenuAudio}
        className={cn(
          "flex-1 p-1 py-1.5 text-center rounded-md",
          active === "tasks" ? "bg-background" : "text-[#9898a0]"
        )}
      >
        Задания
      </Link>
      <Link
        href={`/earn/friends/${user?.id}`}
        onClick={playMenuAudio}
        className={cn(
          "flex-1 p-1 py-1.5 text-center rounded-md",
          active === "frends" ? "bg-background" : "text-[#9898a0]"
        )}
      >
        Друзья
      </Link>
    </div>
  );
}
