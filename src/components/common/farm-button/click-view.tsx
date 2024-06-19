"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
interface ClickViewProps {
  position: {
    top: number;
    left: number;
  };
  count: number;
}

export default function ClickView({ position, count }: ClickViewProps) {
  const [finished, setFinished] = useState(false);
  if (finished) return null;
  return (
    <motion.div
      initial={{
        translateY: 0,
        opacity: 1,
      }}
      onAnimationComplete={() => setFinished(true)}
      animate={{
        translateY: -80,
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      style={{
        top: position.top,
        left: position.left,
      }}
      className="select-none absolute text-2xl rounded-full -translate-x-1/2 -translate-y-1/2 font-bold text-white"
    >
      +{count}
    </motion.div>
  );
}
