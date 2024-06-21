import { LevelUpBoost } from "@/lib/types";
export const levelUpBoostsList: { [key: string]: LevelUpBoost } = {
  click_points: {
    1: {
      cost: 100,
      amount: 1,
    },
    2: {
      cost: 500,
      amount: 2,
    },
    3: {
      cost: 1000,
      amount: 3,
    },
    4: {
      cost: 1300,
      amount: 4,
    },
    maxLevel: 4,
  },
  energy_capacity: {
    1: {
      cost: 100,
      amount: 600,
    },
    2: {
      cost: 600,
      amount: 900,
    },
    3: {
      cost: 1100,
      amount: 1200,
    },
    4: {
      cost: 1600,
      amount: 1500,
    },
    5: {
      cost: 2000,
      amount: 1800,
    },
    maxLevel: 5,
  },
  recharging_speed: {
    1: {
      cost: 100,
      amount: 1,
    },
    2: {
      cost: 500,
      amount: 2,
    },
    3: {
      cost: 800,
      amount: 3,
    },
    4: {
      cost: 1200,
      amount: 4,
    },
    5: {
      cost: 1500,
      amount: 5,
    },
    maxLevel: 5,
  },
};
