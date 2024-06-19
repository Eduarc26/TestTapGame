"use client";
import Providers from "@/components/providers";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function EarnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ProgressBar
        color="white"
        options={{ showSpinner: false }}
        memo={true}
        shallowRouting
        disableSameURL
      />
    </>
  );
}
