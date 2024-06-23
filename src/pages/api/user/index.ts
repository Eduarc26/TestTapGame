import getUser from "@/actions/get-user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const headers = req.headers;
    const headersId = headers["x-user-id"];
    const headersIp = headers["x-forwarded-for"];
    if (!headersId || isNaN(Number(headersId))) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }
    const id = Number(headersId);
    const user: any = await getUser(Number(id));
    if (!user) res.status(404).json({ user: null, success: false });
    const now = new Date();
    let updatesMade = false;
    user.dailyBoosts.forEach((boost: any) => {
      if (boost.available === 0) {
        const lastReset = new Date(boost.lastReset);
        const diff = now.getTime() - lastReset.getTime();
        const oneDay = 24 * 60 * 60 * 1000;

        if (diff > oneDay) {
          boost.available = 3;
          boost.lastReset = now.toISOString();
          updatesMade = true;
        }
      }
    });

    if (headersIp && user.ip !== headersIp) {
      user.ip = headersIp;
      updatesMade = true;
    }

    if (updatesMade) {
      await user.save();
    }
    const { ip, ...userWithoutIp } = user.toObject();
    res.status(200).json({ user: userWithoutIp, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Oops.. Something went wrong" });
  }
}
