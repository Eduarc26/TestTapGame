import { botRun } from "@/modules/telegram/launch";
import type { NextApiRequest, NextApiResponse } from "next";

let botLaunched = false;
export default function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (botLaunched) {
      return res.status(200).json({ message: "Scripts is already launched!" });
    }
    botRun();
    botLaunched = true;
    res.status(200).json({ message: "Scripts successfully launched" });
  } catch (error) {
    return res.status(500).json({ message: "Oops.. Something went wrong" });
  }
}
