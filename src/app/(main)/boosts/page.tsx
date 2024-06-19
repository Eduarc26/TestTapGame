import BackButton from "@/components/common/back-button";
import DailyBoosts from "@/components/common/boosts/daily-boosts";
import LevelUpBoosts from "@/components/common/boosts/level-up-boosts";
import React from "react";

export default function BoostsPage() {
  return (
    <div className="p-4">
      <BackButton />
      <p className="text-lg font-medium mb-2">Дневные бусты</p>
      <DailyBoosts />
      <p className="text-lg font-medium mb-2 mt-8">Бусты</p>
      <LevelUpBoosts />
    </div>
  );
}
