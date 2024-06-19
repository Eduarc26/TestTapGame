import getUser from "@/actions/get-user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  try {
    if (!id || !Number(id))
      return res.status(500).json({ message: "Oops.. Something went wrong" });
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

    if (updatesMade) {
      await user.save();
    }
    res.status(200).json({ user: user, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Oops.. Something went wrong" });
  }
}
