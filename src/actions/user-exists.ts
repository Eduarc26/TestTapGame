import Account from "@/modules/database/models/account";

export default async function userExists(id: number): Promise<boolean> {
  try {
    const user = await Account.findOne({ id });
    return !!user;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
}
