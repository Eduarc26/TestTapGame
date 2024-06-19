import { Task as ITask } from "@/lib/types";
import Task from "@/modules/database/models/task";
import { FilterQuery } from "mongoose";

interface FindTaskResult {
  success: boolean;
  tasks: ITask[];
}

async function findTask(query: string): Promise<FindTaskResult> {
  let searchCriteria: FilterQuery<ITask>;
  const id = parseInt(query, 10);
  if (!isNaN(id)) {
    searchCriteria = { id: id };
  } else {
    searchCriteria = { title: new RegExp(query, "i") };
  }
  try {
    const tasks = await Task.find(searchCriteria);
    return { success: true, tasks };
  } catch (error) {
    console.error("Error finding tasks:", error);
    return { success: false, tasks: [] };
  }
}

export default findTask;
