import Account from "@/modules/database/models/account";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const headers = req.headers;
    const headersId = headers["x-user-id"];
    const headersClicksLeft = headers["x-clicks-left"];
    if (!headersId || isNaN(Number(headersId))) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }
    const id = Number(headersId);
    if (!headersClicksLeft || isNaN(Number(headersClicksLeft))) {
      return res.status(400).json({ message: "click limit has been reached" });
    }
    const clicksLeft = Number(headersClicksLeft);

    const user = await Account.findOne({ id: id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (clicksLeft - 1 <= 0) {
      return res.status(400).json({ message: "click limit has been reached" });
    }

    user.balance += user.perClick;

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
