import Task from "@/modules/database/models/task";

interface DeleteTaskResult {
  success: boolean;
  message: string;
}

export default async function deleteTaskFn(
  id: number
): Promise<DeleteTaskResult> {
  try {
    const task = await Task.findOne({ id });
    if (!task) {
      return {
        success: false,
        message: `<b>Задание с ID <code>${id}</code> не найдено.</b>`,
      };
    }
    await Task.deleteOne({ id });
    return {
      success: true,
      message: `Задание с ID ${id} успешно удалено.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `<b>Произошла ошибка при удалении задания</b>`,
    };
  }
}
