import Gem from "@/components/icons/gem";
import useLevelUpBoost from "@/hooks/use-level-up-boost";
import { ILevelUpBoost } from "@/lib/types";
import { ChevronRight, Dot, Check } from "lucide-react";
import Image from "next/image";
const boostAssets: any = {
  click_points: {
    title: "Мультитап",
    image: "/icons/pointing-up.svg",
  },
  energy_capacity: {
    title: "Лимит энергии",
    image: "/icons/battery.svg",
  },
  recharging_speed: {
    title: "Скорость перезарядки",
    image: "/icons/voltage.svg",
  },
};
interface LevelUpBoostCardProps extends ILevelUpBoost {
  id: number;
  balance: number;
}

export default function LevelUpBoostCard(props: LevelUpBoostCardProps) {
  const { id, balance, ...boost } = props;
  const { triggerBoost, disabled } = useLevelUpBoost({
    id,
    type: boost.type,
  });
  const maxLevel = boost.level === boost.maxLevel;
  const insufficientBalance = boost.cost > balance;
  return (
    <button
      role="button"
      disabled={disabled || maxLevel || insufficientBalance}
      className="flex items-center disabled:opacity-50 transition-opacity duration-150"
      onClick={triggerBoost}
    >
      <div className="size-16 bg-secondary rounded-2xl grid place-items-center">
        <Image
          src={boostAssets[boost.type].image}
          width={35}
          height={35}
          alt="pointing up"
        />
      </div>
      <div className="ml-3">
        <p className="text-neutral-400 text-left">
          {boostAssets[boost.type].title}
        </p>
        {maxLevel ? (
          <div className="text-neutral-500 text-left text-sm font-light">
            Макс. уровень
          </div>
        ) : (
          <span className="flex items-center text-sm mt-0.5">
            <Gem size={13} />{" "}
            <span className="ml-1.5 font-medium">{boost.cost}</span>
            <span className="flex items-center text-neutral-500">
              <Dot />
              {boost.level} lvl
            </span>
          </span>
        )}
      </div>
      <span className="ml-auto">
        {maxLevel ? (
          <Check className="opacity-40" />
        ) : (
          <ChevronRight className="text-neutral-600" />
        )}
      </span>
    </button>
  );
}
