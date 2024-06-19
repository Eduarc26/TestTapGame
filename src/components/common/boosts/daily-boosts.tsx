"use client";
import useUserStore from "@/storage/user-store";
import React from "react";
import DailyBoostCard from "./daily-boost-card";
export default function DailyBoosts() {
  const { user } = useUserStore();
  if (!user) return;
  return (
    <div className="flex gap-3">
      {user.dailyBoosts.map((boost, index) => (
        <DailyBoostCard {...boost} key={index} id={user.id} />
      ))}
    </div>
  );
}
