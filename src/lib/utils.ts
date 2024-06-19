import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const calculateRecoveredClicksLeft = (
  clicksLeft: number,
  lastClicked: string | Date,
  clickLimit: number,
  energyRecoveryPerSecond: number
): number => {
  try {
    const now = new Date();
    let lastClickedDate;

    if (typeof lastClicked === "string" || lastClicked instanceof String) {
      lastClickedDate = new Date(lastClicked);
    } else if (lastClicked instanceof Date) {
      lastClickedDate = lastClicked;
    } else {
      throw new Error("Некорректное значение lastClicked");
    }

    if (isNaN(lastClickedDate.getTime())) {
      throw new Error("Некорректная дата последнего клика");
    }

    const elapsedSeconds = Math.floor(
      (now.getTime() - lastClickedDate.getTime()) / 1000
    );
    const recoveredEnergy = elapsedSeconds * energyRecoveryPerSecond;
    const newClicksLeft = Math.min(clicksLeft + recoveredEnergy, clickLimit);
    return newClicksLeft;
  } catch (error) {
    throw error;
  }
};

export function generateRandomNumber(length: number): number {
  if (length <= 0) {
    throw new Error("Length must be a positive integer");
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateBonus(referralCount: number): number {
  let bonus = 0;

  if (referralCount >= 1 && referralCount <= 5) {
    bonus = 10;
  } else if (referralCount >= 6 && referralCount <= 10) {
    bonus = 12;
  } else if (referralCount >= 11 && referralCount <= 20) {
    bonus = 15;
  } else if (referralCount >= 21 && referralCount <= 30) {
    bonus = 20;
  } else if (referralCount >= 31 && referralCount <= 50) {
    bonus = 25;
  } else if (referralCount > 50) {
    bonus = 30;
  } else return 0;

  return bonus;
}

export const formattedBalance = (balance: number) => {
  return balance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getFriendWord = (amount: number) => {
  if (amount % 10 === 1 && amount % 100 !== 11) {
    return "друг";
  } else if (
    (amount % 10 === 2 && amount % 100 !== 12) ||
    (amount % 10 === 3 && amount % 100 !== 13) ||
    (amount % 10 === 4 && amount % 100 !== 14)
  ) {
    return "друга";
  } else {
    return "друзей";
  }
};
