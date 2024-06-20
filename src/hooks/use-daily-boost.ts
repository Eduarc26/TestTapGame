import User from "@/dto/user";
import useUserStore from "@/storage/user-store";
import React, { useState } from "react";
import { toast } from "sonner";
import { useSounds } from "./use-sounds";

interface IuseDailyBoostProps {
  type: string;
  id: number;
}

export default function useDailyBoost({ type, id }: IuseDailyBoostProps) {
  const [disabled, setDisabled] = useState(false);
  const { playUnlockPowerAudio } = useSounds();
  const { updateUserClicksleft, user, updateUser } = useUserStore();
  const setMaxEnergy = () => {
    playUnlockPowerAudio();
    updateUserClicksleft(user!.clickLimit);
    toast.success("Энергия успешно восстановлена");
  };

  const triggerBoost = async () => {
    if (!user) return;
    try {
      setDisabled(true);
      const result = await User.applyBoost(id, "daily", type);
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
