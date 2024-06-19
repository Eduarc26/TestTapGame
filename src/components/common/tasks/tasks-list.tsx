import React from "react";
import { Task } from "@/lib/types";
import TaskButtonAction from "./task-button-action";
import PartnerTasks from "./partner-tasks";

const currency = process.env.NEXT_PUBLIC_CURRENCY;

interface TasksListProps {
  tasks: Task[];
}
export default function TasksList({ tasks }: TasksListProps) {
  const partnerTasks = tasks.filter((task) => task.partner === true);
  return (
    <div>
      <div className="mt-3">
        {tasks
          .filter((task) => task.partner !== true)
          .map((task) => (
            <div className="flex space-x-4 items-center" key={task.id}>
              <div className="size-8 flex-shrink-0 rounded-full uppercase grid place-items-center text-sm font-medium">
                <div className="size-full rounded-full overflow-hidden grid place-items-center p-1.5">
                  <img width={32} height={32} src={task.logo} alt="" />
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
      <PartnerTasks tasks={partnerTasks} />
    </div>
  );
}
