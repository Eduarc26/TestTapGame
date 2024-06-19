"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useEnergyRecovery from "@/hooks/use-energy-recovery";

export default function ClickProgressButton() {
  const { batteryStyles, progressWidth } = useEnergyRecovery();
  return (
    <div className="size-full text-black relative h-5 mt-4 rounded-md overflow-hidden bg-[#22275e]">
      <motion.div
        initial={{
          width: 0,
        }}
        animate={{ width: `${progressWidth}%` }}
        transition={{ duration: 0.3 }}
        className={cn(
          "text-white h-full font-bold pl-1 animate-pulse transition-colors duration-150",
          batteryStyles
        )}
      />
    </div>
  );
}
