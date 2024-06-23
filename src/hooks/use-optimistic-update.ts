import User from "@/dto/user";
import useUserStore from "@/storage/user-store";
import useLocalStorage from "./use-local-storage";

export default function useOptimistic() {
  const { user, balanceInc, balanceDec } = useUserStore();
  const { getValue } = useLocalStorage();
  const optimisticBalanceUpdate = async () => {
    if (!user || !user.initData) return;
    const now = new Date();
    balanceInc(now);
    try {
      let clicksLeft;
      getValue({
        key: `${user.id}`,
        callback: (data) => {
          clicksLeft = data?.clicksLeft;
        },
      });
      await User.updateBalance(user.initData, clicksLeft);
    } catch (error) {
      balanceDec();
      console.error("Ошибка обновления баланса:", error);
    }
  };

  return { optimisticBalanceUpdate };
}
