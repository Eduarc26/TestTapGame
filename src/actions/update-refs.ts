import { calculateBonus } from "@/lib/utils";
import Account from "@/modules/database/models/account";

export default async function updateRefs(
  id: number,
  refId: number
): Promise<boolean> {
  try {
    const user = await Account.findOneAndUpdate(
      { id },
      { $push: { refsList: refId } },
      { new: true }
    );
    if (!user) {
      return false;
    }
    const referralCount = user.refsList.length;
    const bonus = calculateBonus(referralCount);
    await Account.findOneAndUpdate({ id }, { $inc: { bonusBalance: bonus } });
    return true;
  } catch (error) {
    console.error("Error updating refsList:", error);
    return false;
  }
}
