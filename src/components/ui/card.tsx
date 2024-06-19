import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  descriptionClass?: string;
  action: React.ReactNode;
}

export default function Card({
  descriptionClass = "",
  title,
  icon,
  description,
  action,
}: CardProps) {
  return (
    <div className="flex space-x-4 items-center">
      <div className="size-8 flex-shrink-0 rounded-full uppercase grid place-items-center text-sm font-medium">
        {icon}
      </div>
      <div className="flex-grow border-b border-[#282828] py-1.5 flex justify-between items-center pr-4">
        <div
          className={cn(
            "w-32 whitespace-nowrap overflow-ellipsis overflow-hidden",
            descriptionClass
          )}
        >
          <span className="font-medium text-[15px]">{title}</span>
          {description}
        </div>
        {action}
      </div>
    </div>
  );
}
