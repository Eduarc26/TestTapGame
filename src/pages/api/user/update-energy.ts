import Account from "@/modules/database/models/account";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { id, energy } = req.body;
  try {
    if (!id || !Number(id) || !energy || !Number(energy))
      return res.status(500).json({ message: "Oops.. Something went wrong" });
    const updatedUser = await Account.findOneAndUpdate(
      { id: Number(id) },
      {
        clicksLeft: Number(energy),
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Oops.. Something went wrong during user update",
      success: false,
    });
  }
}
