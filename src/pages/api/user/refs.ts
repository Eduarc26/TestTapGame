import { getReferalsInfo } from "@/actions/get-referals-info";
import getUser from "@/actions/get-user";
import { IUser } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

type User = IUser | null | boolean;

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  try {
    if (!id || isNaN(Number(id)))
      return res.status(500).json({ message: "Oops.. Something went wrong" });

    const user: User = await getUser(Number(id));

    if (!user || typeof user === "boolean") {
      return res.status(404).json({ data: null, success: false });
    }

    const refsList = user.refsList;

    if (!Array.isArray(refsList) || refsList.length === 0)
      return res.status(200).json({ data: [], success: true });

    const data = await getReferalsInfo(refsList);

    res.status(200).json({ data: data, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Oops.. Something went wrong" });
  }
}
