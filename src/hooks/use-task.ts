import { useTelegram } from "@/components/providers/telegram-provider";
import User from "@/dto/user";
import { Task, TaskStatus } from "@/lib/types";
import useUserStore from "@/storage/user-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSounds } from "./use-sounds";

type TaskState = TaskStatus | "claim-loading" | "none";
const delayPromise = (delay: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
export default function useTask(task: Task) {
  const { webApp } = useTelegram();
  const [taskStatus, setTaskStatus] = useState<TaskState>("none");
  const { playUnlockPowerAudio } = useSounds();
  const { user, updateTaskArrays, updateLocalBalance } = useUserStore();
  const showNotificationSuccess = (amount?: number) => {
    playUnlockPowerAudio();
    toast.success(`Вы получили ${amount} гемов!`);
    webApp?.HapticFeedback.impactOccurred("light");
  };
  const updateTaskStatus = (status: TaskState) => {
    setTaskStatus(status);
  };

  useEffect(() => {
    if (user) {
      if (user.completedTasks.includes(task.id)) {
        setTaskStatus("completed");
      } else if (user.claimingTasks.includes(task.id)) {
        setTaskStatus("claim");
      } else {
        setTaskStatus("open");
      }
    }
  }, [user, task.id]);

  const setTaskClaiming = async (taskId: number) => {
    if (!user) return updateTaskStatus("open");
    try {
      updateTaskStatus("pending");
      await User.updateTaskStatus(user.id, taskId, "claim");
      await delayPromise(11000);
      updateTaskArrays(taskId, "claim");
      updateTaskStatus("claim");
    } catch (error: any) {
      const status = error.response.status;
      if (status === 400) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        updateTaskStatus("claim");
        return;
      }
      updateTaskStatus("open");
    }
  };
  const setTaskCompleted = async (taskId: number) => {
    if (!user) return updateTaskStatus("claim");
    try {
      updateTaskStatus("claim-loading");
      const data = await User.updateTaskStatus(user.id, taskId, "completed");
      if (!data.success || !data.amount)
        throw new Error("Oops.. Something went wrong");
      await delayPromise(3000);
      updateTaskArrays(taskId, "completed");
      updateTaskStatus("completed");
      updateLocalBalance(data.amount);
      showNotificationSuccess(data.amount);
    } catch (error: any) {
      const status = error.response.status;
      if (status === 400) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        updateTaskStatus("open");
        return;
      }
      updateTaskStatus("claim");
      toast.error("Ой.. Что то пошло не так");
    }
  };

  return {
    taskStatus,
    updateTaskStatus,
    setTaskClaiming,
    setTaskCompleted,
  };
}
