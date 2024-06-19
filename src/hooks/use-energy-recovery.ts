import useUserStore from "@/storage/user-store";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useOptimistic from "./use-optimistic-update";
import useLocalStorage from "./use-local-storage";
import { calculateRecoveredClicksLeft } from "@/lib/utils";

type TBattery = "green" | "yellow" | "red";

const BATTERY_STYLES: Record<TBattery, string> = {
  green: "bg-[#fbb200]",
  yellow: "bg-[#fbb200]",
  red: "bg-gradient-to-r from-red-500 to-red-600",
};

export default function useEnergyRecovery() {
  const {
    user,
    setLastClicked,
    updateUserClicksleft,
    clicksLeft,
    lastClicked,
    clicksLeftInc,
  } = useUserStore();
  const { setValue, getValue } = useLocalStorage();
  const [secondsFromLastClick, setSecondsFromLastClick] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressWidth = user ? (clicksLeft / user.clickLimit) * 100 : 0;
  const getBatteryState = useCallback((): TBattery => {
    if (progressWidth > 40) return "green";
    if (progressWidth > 20) return "yellow";
    return "red";
  }, [progressWidth]);
  const batteryStyles = BATTERY_STYLES[getBatteryState()];
  const shouldUpdate = useMemo(() => {
    return user ? clicksLeft < user.clickLimit : false;
  }, [user, clicksLeft]);

  const updateLocalEnergy = (
    id: number,
    clicksLeft: number,
    lastClicked: Date
  ) => {
    setValue({
      key: `${id}`,
      data: {
        clicksLeft,
        lastClicked,
      },
    });
  };

  useEffect(() => {
    if (user && lastClicked && clicksLeft) {
      setValue({
        key: `${user.id}`,
        data: {
          clicksLeft,
          lastClicked,
        },
      });
    }
  }, [user, lastClicked, clicksLeft, setValue]);

  useEffect(() => {
    if (shouldUpdate) {
      const getLastClickSecondsAgo = () => {
        if (!user || !lastClicked) return 0;
        const now: string = new Date().toISOString();
        const nowDate: Date = new Date(now);
        const lastClickedDate: Date = new Date(lastClicked);
        const diffInSeconds: number =
          (nowDate.getTime() - lastClickedDate.getTime()) / 1000;
        return diffInSeconds;
      };
      const updateLastClickSecondsAgo = () => {
        if (!user || !lastClicked) return;
        const lastClickSecondsAgo = getLastClickSecondsAgo();
        setSecondsFromLastClick(lastClickSecondsAgo);
        if (lastClickSecondsAgo >= 3) {
          clicksLeftInc();
        }
      };
      updateLastClickSecondsAgo();
      intervalRef.current = setInterval(updateLastClickSecondsAgo, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [shouldUpdate, lastClicked, clicksLeftInc, user]);

  useEffect(() => {
    if (user) {
      getValue({
        key: `${user.id}`,
        callback: (data) => {
          const clicksLeft = data?.clicksLeft ?? user.clickLimit;
          const lastClicked = data?.lastClicked
            ? new Date(data.lastClicked)
            : new Date();

          const newClicksLeft = calculateRecoveredClicksLeft(
            clicksLeft,
            lastClicked,
            user.clickLimit,
            user.energyRecoveryPerSecond
          );
          updateUserClicksleft(newClicksLeft);
          setLastClicked(lastClicked);
        },
      });
    }
  }, [user, getValue, updateUserClicksleft, setLastClicked]);

  useEffect(() => {
    if (user && clicksLeft) {
      if (clicksLeft > user.clickLimit) {
        updateUserClicksleft(user.clickLimit);
      }
      if (clicksLeft < 0) {
        updateUserClicksleft(0);
      }
    }
  }, [clicksLeft, user, updateUserClicksleft]);

  return {
    progressWidth,
    batteryStyles,
    shouldUpdate,
    secondsFromLastClick,
    updateLocalEnergy,
  };
}
