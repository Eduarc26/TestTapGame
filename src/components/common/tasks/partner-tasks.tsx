import { Task } from "@/lib/types";
import React from "react";
import TaskButtonAction from "./task-button-action";
import { cn } from "@/lib/utils";
const currency = process.env.NEXT_PUBLIC_CURRENCY;

interface PartnerTasksProps {
  tasks: Task[];
}

export default function PartnerTasks({ tasks }: PartnerTasksProps) {
  if (tasks.length === 0) return;
  return (
    <div>
      <p className="text-sm text-[#e5e5e599] mt-6 mb-1">От партнеров</p>
      {tasks.map((task, index) => (
        <div
          className={cn(
            "flex space-x-4 items-center",
            index === tasks.length - 1 && "mb-10"
          )}
          key={task.id}
        >
          <div className="size-8 flex-shrink-0 rounded-full uppercase grid place-items-center text-sm font-medium">
            <div className="size-full rounded-full overflow-hidden grid place-items-center p-1.5">
              <img src={task.logo} width={32} height={32} alt="" />
            </div>
          </div>
          <div className="flex-grow border-b border-[#282828] py-1.5 flex justify-between items-start pr-4">
            <div className="w-56 whitespace-nowrap overflow-ellipsis overflow-hidden">
              <span className="text-[15px]">{task.title}</span>
              <span className="text-white/85 py-1 text-xs flex items-center font-semibold">
                +{task.amount} {currency}
                {task.description !== "-" && (
                  <span className="ml-1.5 text-[#e5e5e599]">
                    {task.description}
                  </span>
                )}
              </span>
            </div>
            <div className="font-medium">
              <TaskButtonAction {...task} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
