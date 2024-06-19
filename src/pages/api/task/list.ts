import Task from "@/modules/database/models/task";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tasks = await Task.find().lean().exec();
    if (!tasks) {
      return res
        .status(500)
        .json({ success: false, message: "Oops.. Something went wrong" });
    }
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return res
      .status(500)
      .json({ success: false, message: "Oops.. Something went wrong" });
  }
}
