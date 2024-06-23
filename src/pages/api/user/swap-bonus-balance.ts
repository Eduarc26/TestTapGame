import Account from "@/modules/database/models/account";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function swapBonusBalance(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const headers = req.headers;
    const headersId = headers["x-user-id"];
    if (!headersId || isNaN(Number(headersId))) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }
    const id = Number(headersId);
    const user = await Account.findOne({ id: Number(id) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newBalance = user.balance + user.bonusBalance;
    const updatedUser = await Account.findOneAndUpdate(
      { id: Number(id) },
      {
        balance: newBalance,
        bonusBalance: 0,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update user balance" });
    }

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error swapping bonus balance:", error);
    return res.status(500).json({
      message: "Oops.. Something went wrong during bonus balance swap",
      success: false,
    });
  }
}
