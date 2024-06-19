import useDailyBoost from "@/hooks/use-daily-boost";
import { IDailyBoost } from "@/lib/types";
import Image from "next/image";
import React from "react";
const boostAssets: any = {
  "full-energy": {
    title: "Полная энергия",
    image: "/icons/voltage.svg",
  },
};

interface DailyBoostCardProps extends IDailyBoost {
  id: number;
}

export default function DailyBoostCard(props: DailyBoostCardProps) {
  const { id, ...boost } = props;
  const { triggerBoost, disabled } = useDailyBoost({
    type: boost.type,
    id,
  });
  return (
    <button
      disabled={boost.available === 0 || disabled}
      onClick={triggerBoost}
      className="bg-primary flex-1 rounded-2xl px-4 py-2.5 flex justify-between disabled:opacity-50 transition-opacity duration-150"
    >
      <span>
        <p className="text-left text-base"> {boostAssets[boost.type].title}</p>
        <p className="ml-1 text-sm text-[#878787] text-left">
          {boost.available}/3 доступно
        </p>
      </span>
      <span className="mt-1.5">
        <Image
          src={boostAssets[boost.type].image}
          width={35}
          height={35}
          alt="battery"
        />
      </span>
    </button>
  );
}
