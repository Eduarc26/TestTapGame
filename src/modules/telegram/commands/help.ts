import { Context } from "telegraf";

export default async function help(ctx: Context) {
  if (!ctx.from) return;
  const message = `<b>Список команд</b>\n\n/createTask <b>- Создать задание</b>\n/findTask <b>- Найти задание</b>\n/deleteTask <code>ID</code> <b>- Удалить задание</b>\n/registerStats <b>- Статистика регистраций юзеров</b>`;
  await ctx.reply(message, {
    parse_mode: "HTML",
  });
}
