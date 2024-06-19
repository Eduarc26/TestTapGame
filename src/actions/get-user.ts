import { IUser } from "@/lib/types";
import Account from "@/modules/database/models/account";

export default async function getUser(id: number): Promise<boolean | IUser> {
  try {
    const user = await Account.findOne({ id });
    return user;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
}
