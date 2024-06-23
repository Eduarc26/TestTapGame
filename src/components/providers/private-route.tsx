"use client";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTelegram } from "./telegram-provider";
import useUserStore from "@/storage/user-store";
import PageLoader from "../common/loader";
import ErrorPage from "../common/error-page";
import useLocalStorage from "@/hooks/use-local-storage";
import { calculateRecoveredClicksLeft } from "@/lib/utils";
import User from "@/dto/user";
export default function PrivateRoute({ children }: PropsWithChildren) {
  const { user, webApp } = useTelegram();
  const { getValue } = useLocalStorage();
  const { updateUser, updateUserClicksleft, setLastClicked } = useUserStore();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getUserData = useCallback(
    async (initData: string) => {
      try {
        const result = await User.me(initData);
        const { success, user } = result;
        if (!success) return setError(true);
        getValue({
          key: `${user.id}`,
          callback: (data) => {
            const clicksLeft = data?.clicksLeft ?? user.clickLimit;
            const lastClicked = data?.lastClicked ?? new Date();
            updateUserClicksleft(clicksLeft);
            setLastClicked(lastClicked);
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
        updateUser({ initData, ...user });
        setLoaded(true);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    },
    [updateUser, getValue, setLastClicked, updateUserClicksleft]
  );

  useEffect(() => {
    if (!user || !webApp) return;
    webApp.expand();
    webApp.setBackgroundColor("#000");
    webApp.setHeaderColor("#000");
    getUserData(webApp.initData);
  }, [user, webApp, getUserData]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        setError(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [user]);

  if (error) return <ErrorPage />;

  if (!loaded) return <PageLoader />;
  return <>{children}</>;
}
