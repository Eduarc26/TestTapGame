import User from "@/dto/user";
import useUserStore from "@/storage/user-store";
import React, { useState } from "react";
import { toast } from "sonner";
import { useSounds } from "./use-sounds";
import { useTelegram } from "@/components/providers/telegram-provider";

interface IuseDailyBoostProps {
  type: string;
  id: number;
}

export default function useDailyBoost({ type, id }: IuseDailyBoostProps) {
  const [disabled, setDisabled] = useState(false);
  const { webApp } = useTelegram();
  const { playUnlockPowerAudio } = useSounds();
  const { updateUserClicksleft, user, updateUser } = useUserStore();
  const setMaxEnergy = () => {
    playUnlockPowerAudio();
    updateUserClicksleft(user!.clickLimit);
    toast.success("Энергия восстановлена");
  };

  const triggerBoost = async () => {
    if (!webApp?.initData) return;
    try {
      setDisabled(true);
      const result = await User.applyBoost(webApp.initData, "daily", type);
      if (!result.success || !result.data) {
        toast.error("Что то пошло не так. Повторите попытку позже");
        setDisabled(false);
        return;
      }
      if (type === "full-energy") {
        setMaxEnergy();
      }
      updateUser(result.data);
      setDisabled(false);
    } catch (error) {
      toast.error("Что то пошло не так. Повторите попытку позже");
      setDisabled(false);
    }
  };
  return { triggerBoost, disabled };
}
