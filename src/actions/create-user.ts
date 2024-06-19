"use server";

import Account from "@/modules/database/models/account";
import { levelUpBoostsList } from "@/pages/api/user/use-boost";

interface CreateUserProps {
  id: number;
  name: string;
  invitedBy: number | null;
}
const avatars = [
  "#ECB176",
  "#FF5580",
  "#7469B6",
  "#00215E",
  "#1A4D2E",
  "#C65BCF",
  "#A34343",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
};

const a = levelUpBoostsList[""];

export default async function createUser({
  id,
  invitedBy,
  name,
}: CreateUserProps) {
  const newAccount = new Account({
    id,
    name,
    invitedBy,
    perClick: 1,
    avatarColor: getRandomColor(),
    clickLimit: 600,
    balance: invitedBy ? 10 : 0,
    dailyBoosts: [{ type: "full-energy", available: 3, lastReset: new Date() }],
    levelUpBoosts: [
      {
        type: "click_points",
        level: 1,
        cost: levelUpBoostsList.click_points[1].cost,
      },
      {
        type: "energy_capacity",
        level: 1,
        cost: levelUpBoostsList.energy_capacity[1].cost,
      },
      {
        type: "recharging_speed",
        level: 1,
        cost: levelUpBoostsList.recharging_speed[1].cost,
      },
    ],
    energyRecoveryPerSecond: 1,
  });
  try {
    await newAccount.save();
  } catch (error) {
    throw new Error("Error while creating user");
  }
}
