import User from "@/dto/user";
import useUserStore from "@/storage/user-store";
import useEnergyRecovery from "./use-energy-recovery";

export default function useOptimistic() {
  const { user, balanceInc, balanceDec, clicksLeft, updateUserClicksleft } =
    useUserStore();

  const optimisticBalanceUpdate = async () => {
    if (!user) return;
    const now = new Date();
    balanceInc(now);
    try {
      await User.updateBalance(user.id, user.balance + user.perClick, now);
    } catch (error) {
      balanceDec();
      console.error("Ошибка обновления баланса:", error);
    }
  };

  return { optimisticBalanceUpdate };
}
