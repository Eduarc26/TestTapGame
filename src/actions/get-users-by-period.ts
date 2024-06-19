import { IUser } from "@/lib/types";
import Account from "@/modules/database/models/account";
type Period = "today" | "week" | "month" | "all-time";

export default async function getUsersByPeriod(
  period: Period
): Promise<IUser[]> {
  const now = new Date();
  let start: Date;

  switch (period) {
    case "today":
      start = new Date();
      start.setHours(0, 0, 0, 0);
      break;
    case "week":
      start = new Date();
      start.setDate(start.getDate() - 7);
      start.setHours(0, 0, 0, 0);
      break;
    case "month":
      start = new Date();
      start.setMonth(start.getMonth() - 1);
      start.setHours(0, 0, 0, 0);
      break;
    case "all-time":
      return Account.find();
    default:
      throw new Error("Invalid period");
  }

  return Account.find({
    registeredAt: {
      $gte: start,
      $lte: now,
    },
  });
}
