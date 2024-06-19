import { IUser, Referals } from "@/lib/types";
import Account from "@/modules/database/models/account";
import getUser from "./get-user";

export async function getReferalsInfo(refsList: number[]): Promise<Referals[]> {
  try {
    const users = await Account.find({ id: { $in: refsList } });
    const filteredUsers = users.map((user) => ({
      id: user.id,
      avatarColor: user.avatarColor,
      name: user.name,
      balance: user.balance,
      refs: user.refsList.length,
    }));
    return filteredUsers;
  } catch (error) {
    console.error("Error fetching referals info:", error);
    return [];
  }
}

export async function getReferalsInfoById(id: number): Promise<Referals[]> {
  try {
    const user: IUser | boolean = await getUser(Number(id));
    if (!user || typeof user === "boolean") return [];
    const refsList = user.refsList;
    if (!Array.isArray(refsList) || refsList.length === 0) return [];
    const users = await Account.find({ id: { $in: refsList } });
    const filteredUsers = users.map((user) => ({
      id: user.id,
      avatarColor: user.avatarColor,
      name: user.name,
      balance: user.balance,
      refs: user.refsList.length,
    }));
    filteredUsers.sort((a, b) => b.balance - a.balance);
    return filteredUsers;
  } catch (error) {
    console.error("Error fetching referals info:", error);
    // return [];
    throw new Error("Something went wrong");
  }
}
