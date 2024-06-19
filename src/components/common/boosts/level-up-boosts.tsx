"use client";
import useUserStore from "@/storage/user-store";
import LevelUpBoostCard from "./level-up-boost-card";

export default function LevelUpBoosts() {
  const { user } = useUserStore();
  if (!user) return;
  return (
    <div className="bg-primary rounded-2xl px-4 py-2.5 flex flex-col gap-4 mt-2">
      {user.levelUpBoosts.map((boost) => (
        <LevelUpBoostCard
          {...boost}
          id={user.id}
          balance={user.balance}
          key={boost.type}
        />
      ))}
    </div>
  );
}
