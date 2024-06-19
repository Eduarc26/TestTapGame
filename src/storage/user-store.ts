import { IUser, TaskStatus } from "@/lib/types";
import { create } from "zustand";

type Store = {
  user: IUser | null;
  lastClicked: Date | null;
  clicksLeft: number;
  balanceInc: (time: Date) => void;
  balanceDec: () => void;
  updateUser: (user: IUser) => void;
  updateLocalBalance: (balance: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setLastClicked: (timestamp: Date | null) => void;
  updateUserClicksleft: (clicks: number) => void;
  clicksLeftInc: () => void;
  updateTaskArrays: (taskId: number, status: TaskStatus) => void;
};

const useUserStore = create<Store>()((set) => ({
  user: null,
  lastClicked: null,
  clicksLeft: 0,
  loading: true,
  setLoading: (loading) => set({ loading: loading }),
  balanceInc: (time) =>
    set((state) => {
      if (state.user) {
        if (state.user && state.clicksLeft > 0) {
          return {
            user: {
              ...state.user,
              balance: state.user.balance + state.user.perClick,
              // clicksLeft: state.user.clicksLeft - 1,
            },
            clicksLeft: state.clicksLeft - 1,
            lastClicked: time,
          };
        }
      }
      return state;
    }),
  balanceDec: () =>
    set((state) => {
      // if (state.user && state.user.clicksLeft > 0) {
      if (state.user) {
        return {
          user: {
            ...state.user,
            balance: state.user.balance - state.user.perClick,
            // clicksLeft: state.user.clicksLeft + 1,
          },
        };
      }
      return state;
    }),
  updateUser: (user) => set({ user }),
  setLastClicked: (timestamp) => set({ lastClicked: timestamp }),
  clicksLeftInc: () =>
    set((state) => {
      if (state.user) {
        return {
          clicksLeft: state.clicksLeft + state.user?.energyRecoveryPerSecond,
        };
      }
      return state;
    }),
  updateUserClicksleft: (clicksLeft) => set({ clicksLeft: clicksLeft }),
  updateTaskArrays: (taskId, status) =>
    set((state) => {
      if (state.user) {
        let claimingTasks = [...state.user.claimingTasks];
        let completedTasks = [...state.user.completedTasks];

        if (status === "claim") {
          if (!claimingTasks.includes(taskId)) {
            claimingTasks.push(taskId);
          }
        } else if (status === "completed") {
          if (!completedTasks.includes(taskId)) {
            completedTasks.push(taskId);
          }
          claimingTasks = claimingTasks.filter((id) => id !== taskId);
        }

        return {
          user: {
            ...state.user,
            claimingTasks,
            completedTasks,
          },
        };
      }
      return state;
    }),
  updateLocalBalance: (amount) =>
    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            balance: state.user.balance + amount,
          },
        };
      }
      return state;
    }),
}));

export default useUserStore;
