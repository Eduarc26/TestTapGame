"use client";
import { useTelegram } from "@/components/providers/telegram-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface TopNavigationProps {
  active: "tasks" | "frends";
}

export default function TopNavigation({ active }: TopNavigationProps) {
  const { user } = useTelegram();
  return (
    <div className="bg-primary rounded-md p-1 flex">
      <Link
        href={"/earn/tasks"}
        className={cn(
          "flex-1 p-1 py-1.5 text-center rounded-md",
          active === "tasks" ? "bg-black" : "text-[#9898a0]"
        )}
      >
        Задания
      </Link>
      <Link
        href={`/earn/friends/${user?.id}`}
        className={cn(
          "flex-1 p-1 py-1.5 text-center rounded-md",
          active === "frends" ? "bg-black" : "text-[#9898a0]"
        )}
      >
        Друзья
      </Link>
    </div>
  );
}
