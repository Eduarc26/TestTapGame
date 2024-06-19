import Account from "@/modules/database/models/account";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { id, lastClicked } = req.body;
  try {
    if (!id || !Number(id) || !lastClicked) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Найти пользователя по id
    const user = await Account.findOne({ id: Number(id) });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Обновить баланс и lastClicked
    user.balance += user.perClick; // Прибавить к текущему балансу значение 1
    user.lastClicked = lastClicked;

    // Сохранить изменения
    const updatedUser = await user.save();

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Oops.. Something went wrong during user update",
      success: false,
    });
  }
}
