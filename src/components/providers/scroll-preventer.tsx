"use client";
import { PropsWithChildren, useEffect } from "react";
import { useTelegram } from "./telegram-provider";

export default function ScrollPreventer({ children }: PropsWithChildren) {
  const { webApp } = useTelegram();
  useEffect(() => {
    if (!webApp) return;
    webApp.expand();
    const overflow = 100;
    document.body.style.overflowY = "hidden";
    // document.body.style.marginTop = `${overflow}px`;
    // document.body.style.height = window.innerHeight + overflow + "px";
    // document.body.style.paddingBottom = `${overflow}px`;
    window.scrollTo(0, overflow);

    let ts: number | undefined;
    const scrollableEl = document.getElementById("app-scrollable");

    const onTouchStart = (e: TouchEvent) => {
      ts = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (scrollableEl) {
        const scroll = scrollableEl.scrollTop;
        const te = e.changedTouches[0].clientY;
        if (scroll <= 0 && ts! < te) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };
    document.documentElement.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    document.documentElement.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });

    return () => {
      document.documentElement.removeEventListener("touchstart", onTouchStart);
      document.documentElement.removeEventListener("touchmove", onTouchMove);
    };
  }, [webApp]);

  return (
    <div
      id="app-scrollable"
      className="bg-transparent"
      style={{ overflowY: "auto", height: "100vh" }}
    >
      {children}
    </div>
  );
}
