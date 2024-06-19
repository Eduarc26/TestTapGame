"use client";
import React, { PropsWithChildren } from "react";
import { TelegramProvider } from "./telegram-provider";
import PrivateRoute from "./private-route";
// import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import ScrollPreventer from "./scroll-preventer";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <TelegramProvider>
      <ScrollPreventer>
        {/* <ProgressBar
          color="white"
          options={{ showSpinner: false,  }}
          memo={true}
          shallowRouting
          disableSameURL
        /> */}
        <PrivateRoute>{children}</PrivateRoute>
      </ScrollPreventer>
    </TelegramProvider>
  );
}
