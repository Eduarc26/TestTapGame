import { IUser, TaskStatus } from "@/lib/types";
import Api from "./api";

const User = {
  updateBalance: async (id: number, balance: number, lastClicked: Date) => {
    const response = await Api.post("/user/update-balance", {
      id,
      balance,
      lastClicked,
    });
    return response.data;
  },
  updateEnergy: async (id: number, energy: number) => {
    const response = await Api.post("/user/update-energy", {
      id,
      energy,
    });
    return response.data;
  },
  updateTaskStatus: async (id: number, taskId: number, status: TaskStatus) => {
    const response = await Api.post("/user/update-task", {
      id,
      taskId,
      status,
    });
    return response.data;
  },
  swapBonusBalance: async (id: number) => {
    const response = await Api.post("/user/swap-bonus-balance", {
      id,
    });
    return response.data;
  },
  applyBoost: async (
    id: number,
    boostType: string,
    boostKey: string
  ): Promise<{ data: IUser | null; success: boolean }> => {
    const response = await Api.post("/user/use-boost", {
      id,
      boostKey,
      boostType,
    });
    return response.data;
  },
};

export default User;
