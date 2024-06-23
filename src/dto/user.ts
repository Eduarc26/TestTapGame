import { IUser, TaskStatus } from "@/lib/types";
import Api from "./api";

const User = {
  me: async (initData: string) => {
    const response = await Api.post(
      "/user",
      {},
      {
        headers: {
          "x-auth-data": initData,
        },
      }
    );
    return response.data;
  },
  updateBalance: async (initData: string, clicksLeft: any) => {
    const response = await Api.post(
      "/user/update-balance",
      {},
      {
        headers: {
          "x-auth-data": initData,
          "x-clicks-left": clicksLeft,
        },
      }
    );
    return response.data;
  },
  updateEnergy: async (id: number, energy: number) => {
    const response = await Api.post("/user/update-energy", {
      id,
      energy,
    });
    return response.data;
  },
  updateTaskStatus: async (
    initData: string,
    taskId: number,
    status: TaskStatus
  ) => {
    const response = await Api.post(
      "/user/update-task",
      {
        taskId,
        status,
      },
      {
        headers: {
          "x-auth-data": initData,
        },
      }
    );
    return response.data;
  },
  swapBonusBalance: async (initData: string) => {
    const response = await Api.post(
      "/user/swap-bonus-balance",
      {},
      {
        headers: {
          "x-auth-data": initData,
        },
      }
    );
    return response.data;
  },
  applyBoost: async (
    initData: string,
    boostType: string,
    boostKey: string
  ): Promise<{ data: IUser | null; success: boolean }> => {
    const response = await Api.post(
      "/user/use-boost",
      {
        boostKey,
        boostType,
      },
      {
        headers: {
          "x-auth-data": initData,
        },
      }
    );
    return response.data;
  },
};

export default User;
