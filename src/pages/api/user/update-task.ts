import { Task as ITask } from "@/lib/types";
import Account from "@/modules/database/models/account";
import Task from "@/modules/database/models/task";
import bot from "@/modules/telegram/launch";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { id, taskId, status } = req.body;

  try {
    if (!id || isNaN(Number(id)) || !taskId || isNaN(Number(taskId))) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const task: ITask | null = await Task.findOne({ id: Number(taskId) });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const user = await Account.findOne({ id: Number(id) });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const channel = task.subscribe;
    if (status === "claim") {
      if (user.completedTasks.includes(taskId)) {
        return res.status(400).json({ message: "Задание уже выполнено" });
      }
      if (user.claimingTasks.includes(taskId)) {
        return res.status(400).json({ message: "Награда уже получена" });
      }
      await Account.updateOne(
        { id: Number(id) },
        { $push: { claimingTasks: taskId } }
      );
    } else if (status === "completed") {
      if (channel && channel !== "-") {
        const chatMember = await bot.telegram.getChatMember(channel, id);
        if (
          chatMember.status !== "member" &&
          chatMember.status !== "administrator" &&
          chatMember.status !== "creator"
        ) {
          await Account.updateOne(
            { id: Number(id) },
            {
              $pull: { claimingTasks: taskId, completedTasks: taskId },
            }
          );
          return res.status(400).json({
            success: false,
            message: "Подписка на канал не обнаружена. Повторите попытку",
          });
        }
      }

      if (user.completedTasks.includes(taskId)) {
        return res.status(400).json({ message: "Задание уже выполнено" });
      }

      if (!user.claimingTasks.includes(taskId)) {
        return res
          .status(400)
          .json({ message: "Что то пошло не так.. Повторите попытку позже" });
      }
      const newBalance = user.balance + task.amount;
      await Account.updateOne(
        { id: Number(id) },
        {
          $push: { completedTasks: taskId },
          $pull: { claimingTasks: taskId },
          balance: newBalance,
        }
      );
    } else {
      return res.status(400).json({ message: "Invalid status" });
    }

    return res.status(200).json({ success: true, amount: task.amount });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Oops.. Something went wrong during user update",
      success: false,
    });
  }
}
