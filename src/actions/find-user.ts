import Account from "@/modules/database/models/account";

export default async function findUser(param: string) {
  try {
    let user;
    const sanitizedParam = param.replace(/^@/, "");

    if (!isNaN(Number(sanitizedParam))) {
      const id = Number(sanitizedParam);
      user = await Account.findOne({ id: id });
    } else {
      user = await Account.findOne({
        username: new RegExp(sanitizedParam, "i"),
      });
    }

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}
