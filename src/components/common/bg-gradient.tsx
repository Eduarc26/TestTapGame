"use client";
import useUserStore from "@/storage/user-store";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GradientState = "light" | "medium" | "large";

export default function BackgroundGradient() {
  const { lastClicked } = useUserStore();
  const [clickCount, setClickCount] = useState(0);
  const [gradientState, setGradientState] = useState<GradientState>("light");
  const [lastClickTime, setLastClickTime] = useState(Date.now());

  useEffect(() => {
    const handleUserClick = () => {
      const now = Date.now();
      if (now - lastClickTime <= 700) {
        setClickCount((prevCount) => prevCount + 1);
      } else {
        setClickCount(1);
      }
      setLastClickTime(now);
    };

    const clickButton = document.getElementById("farm-button");
    if (clickButton) {
      clickButton.addEventListener("touchstart", handleUserClick);
    }

    return () => {
      if (clickButton) {
        clickButton.removeEventListener("touchstart", handleUserClick);
      }
    };
  }, [lastClickTime]);

  useEffect(() => {
    let gradientTimeout: NodeJS.Timeout;

    if (clickCount >= 50) {
      setGradientState("large");
    } else if (clickCount >= 15) {
      setGradientState("medium");
    } else {
      setGradientState("light");
    }

    if (clickCount > 0) {
      gradientTimeout = setTimeout(() => {
        const now = Date.now();
        if (now - lastClickTime >= 1000) {
          if (gradientState === "large") {
            setGradientState("medium");
            setTimeout(() => setGradientState("light"), 500);
          } else {
            setGradientState("light");
          }
          setClickCount(0);
        }
      }, 1000);
    }

    return () => clearTimeout(gradientTimeout);
  }, [clickCount, lastClickTime, gradientState]);

  const gradientStyles = {
    light: {
      background:
        "radial-gradient(circle, rgba(246, 186, 24, 1) 0%, rgba(0, 0, 0, 1) 63%, rgba(0, 0, 0, 1) 100%)",
    },
    medium: {
      background:
        "radial-gradient(circle, rgba(246, 186, 24, 1) 0%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 1) 100%)",
    },
    large: {
      background:
        "radial-gradient(circle, rgba(246, 186, 24, 1) 0%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 1) 100%)",
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="gradient-bg h-screen -z-10 w-full absolute left-0 top-[12%]"
        key={gradientState}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={gradientStyles[gradientState]}
      />
    </AnimatePresence>
  );
}
