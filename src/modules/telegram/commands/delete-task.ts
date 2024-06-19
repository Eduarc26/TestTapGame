import deleteTaskFn from "@/actions/delete-task";
import { Context } from "telegraf";

export default async function deleteTask(ctx: Context, message: string) {
  if (!ctx.from) return;
  const parts = message.split(" ");
  if (parts.length < 2) {
    await ctx.reply(
      "<b>Пожалуйста, укажите ID задачи.\n\nНапример: /deleteTask 123456</b>",
      {
        parse_mode: "HTML",
      }
    );
    return;
  }
  const taskId = parts[1];
  const result = await deleteTaskFn(Number(taskId));
  if (!result.success) {
    await ctx.reply(result.message, {
      parse_mode: "HTML",
    });
    return;
  }
  await ctx.reply(`<b>Задание <code>${taskId}</code> успешно удалено</b>`, {
    parse_mode: "HTML",
  });
}
