import Task from "@/modules/database/models/task";

export default async function getTasks(): Promise<any | null> {
  try {
    const tasks = await Task.find().lean().exec(); // добавлено exec() для завершения запроса
    return tasks.length > 0 ? tasks : null;
  } catch (error) {
    console.error("Failed to fetch tasks:", error); // логирование ошибки для отладки
    return null;
  }
}
