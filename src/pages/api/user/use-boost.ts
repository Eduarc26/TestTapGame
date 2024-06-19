import getUser from "@/actions/get-user";
import { IUser, IDailyBoost, ILevelUpBoost } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

interface ILevelUpBoostDetails {
  cost: number;
  amount: number;
}

interface LevelUpBoost {
  [level: number]: ILevelUpBoostDetails;
  maxLevel: number;
}
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

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { id, boostType, boostKey } = req.body;
  try {
    if (
      !id ||
      isNaN(Number(id)) ||
      (boostType !== "level-up" && boostType !== "daily")
    )
      return res.status(500).json({ message: "Oops.. Something went wrong" });

    const user: any = await getUser(Number(id));

    if (!user || typeof user === "boolean") {
      return res.status(404).json({ data: null, success: false });
    }

    if (boostType === "daily") {
      const dailyBoosts = user.dailyBoosts;
      const boost: IDailyBoost | undefined = dailyBoosts.find(
        (b: IDailyBoost) => b.type === boostKey
      );

      if (!boost) {
        return res
          .status(404)
          .json({ success: false, message: "Boost not found" });
      }

      const now = new Date();
      const timeSinceLastReset = now.getTime() - boost.lastReset.getTime();
      const oneDayInMillis = 24 * 60 * 60 * 1000;

      if (timeSinceLastReset > oneDayInMillis) {
        boost.available = 3;
        boost.lastReset = now;
      }

      if (boost.available > 0) {
        boost.available -= 1;
        await user.save();
        return res.status(200).json({ success: true, data: user });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Boost not available" });
      }
    }

    if (boostType === "level-up") {
      const levelUpBoosts: ILevelUpBoost[] = user.levelUpBoosts;
      if (!levelUpBoosts) {
        return res
          .status(404)
          .json({ message: "Oops.. Something went wrong", success: true });
      }

      const boost = levelUpBoosts.find((boost) => boost.type === boostKey);
      if (!boost) {
        return res
          .status(404)
          .json({ message: "Oops.. Something went wrong", success: true });
      }
      const boostDetails = levelUpBoostsList[boost.type];
      if (!boostDetails) {
        return res
          .status(404)
          .json({ message: "Boost type not found", success: false });
      }
      const currentLevel = boost.level;
      if (currentLevel >= boostDetails.maxLevel) {
        return res.status(400).json({
          success: false,
          message: `Max level for this boost is ${boostDetails.maxLevel}`,
        });
      }
      const nextLevel = currentLevel + 1;
      const cost = boostDetails[nextLevel].cost;
      const currentCost = boostDetails[currentLevel].cost;
      const amount = boostDetails[nextLevel].amount;
      console.log(user.balance, cost);
      if (user.balance < currentCost) {
        return res
          .status(400)
          .json({ success: false, message: "Insufficient balance" });
      }
      user.balance -= currentCost;
      boost.level = nextLevel;
      boost.cost = boostDetails[nextLevel].cost;

      if (boost.type === "click_points") {
        user.perClick = amount;
      }
      if (boost.type === "energy_capacity") {
        user.clickLimit = amount;
      }
      if (boost.type === "recharging_speed") {
        user.energyRecoveryPerSecond = amount;
      }
      boost.maxLevel = boostDetails.maxLevel;
      await user.save();
      res.status(200).json({
        data: user,
        success: true,
        message: "Boost successfully applied",
      });
    }

    console.log(user, id, boostType, boostKey);
    res.status(200).json({ data: null, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Oops.. Something went wrong" });
  }
}
