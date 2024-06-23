import User from "@/dto/user";
import useUserStore from "@/storage/user-store";
import { useState } from "react";
import { toast } from "sonner";
import { useSounds } from "./use-sounds";
import { useTelegram } from "@/components/providers/telegram-provider";

interface UseLevelUpBoostProps {
  id: number;
  type: string;
}

const successMessage: any = {
  click_points: "Мультитап улучшен",
  energy_capacity: "Лимит энергии увеличен",
  recharging_speed: "Скорость перезарядки улучшена",
};

export default function useLevelUpBoost({ id, type }: UseLevelUpBoostProps) {
  const [disabled, setDisabled] = useState(false);
  const { updateUser } = useUserStore();
  const { playUnlockPowerAudio } = useSounds();
  const { webApp } = useTelegram();

  const triggerBoost = async () => {
    if (!webApp?.initData) return;

    try {
      setDisabled(true);
      const result = await User.applyBoost(webApp.initData, "level-up", type);
      if (!result.success || !result.data) {
        toast.error("Что то пошло не так, повторите попытку позже");
        setDisabled(false);
        return;
      }
      updateUser(result.data);
      playUnlockPowerAudio();
      const message = successMessage[type] ?? "Буст успешно добавлен";
      toast.success(message);
      setDisabled(false);
    } catch (error) {
      toast.error("Что то пошло не так. Повторите попытку позже");
      console.log(error);
      setDisabled(false);
    }
  };
  return {
    triggerBoost,
    disabled,
  };
}
