"use client";
import React, { PropsWithChildren } from "react";
import { TelegramProvider } from "./telegram-provider";
import PrivateRoute from "./private-route";
import ScrollPreventer from "./scroll-preventer";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <TelegramProvider>
      <ScrollPreventer>
        <PrivateRoute>{children}</PrivateRoute>
      </ScrollPreventer>
    </TelegramProvider>
  );
}
