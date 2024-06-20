import User from "@/dto/user";
import useUserStore from "@/storage/user-store";
import { useState } from "react";
import { toast } from "sonner";
import { useSounds } from "./use-sounds";

interface UseLevelUpBoostProps {
  id: number;
  type: string;
}
export default function useLevelUpBoost({ id, type }: UseLevelUpBoostProps) {
  const [disabled, setDisabled] = useState(false);
  const { updateUser } = useUserStore();
  const { playUnlockPowerAudio } = useSounds();

  const triggerBoost = async () => {
    try {
      setDisabled(true);
      const result = await User.applyBoost(id, "level-up", type);
      if (!result.success || !result.data) {
        toast.error("Что то пошло не так, повторите попытку позже");
        setDisabled(false);
        return;
      }
      updateUser(result.data);
      playUnlockPowerAudio();
      toast.success("Буст успешно добавлен");
      setDisabled(false);
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  };
  return {
    triggerBoost,
    disabled,
  };
}
