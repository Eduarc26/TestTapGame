import { generateRandomNumber } from "@/lib/utils";
import Task from "@/modules/database/models/task";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { password, logo, title, description, link, amount, partner } =
    req.body;
  try {
    if (password !== "123")
      return res.status(500).json({ message: "Oops.. Something went wrong" });
    const newTask = new Task({
      id: generateRandomNumber(6),
      logo,
      title,
      description,
      type: "subscribe",
      link,
      amount,
      partner: !!partner,
    });
    await newTask.save();

    if (!newTask)
      return res.status(500).json({ message: "Oops.. Something went wrong" });
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: "Oops.. Something went wrong" });
  }
}
