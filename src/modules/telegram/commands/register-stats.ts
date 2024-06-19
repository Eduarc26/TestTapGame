import getUsersByPeriod from "@/actions/get-users-by-period";
import { Context } from "telegraf";

export default async function registerStats(ctx: Context) {
  if (!ctx.from) return;
  const usersTodayList = await getUsersByPeriod("today");
  const usersWeekList = await getUsersByPeriod("week");
  const usersMonthList = await getUsersByPeriod("month");
  const usersAllList = await getUsersByPeriod("all-time");
  const usersTodayMessage = `<b>▫️ Сегодня: ${usersTodayList.length}</b>`;
  const usersWeekMessage = `<b>▫️ За неделю: ${usersWeekList.length}</b>`;
  const userMonthMessage = `<b>▫️ В этом месяце: ${usersMonthList.length}</b>`;
  const usersAllMessage = `<b>⌛️ За всё время: ${usersAllList.length}</b>`;
  const message = `<b>Статистика регистраций</b>\n\n${usersTodayMessage}\n${usersWeekMessage}\n${userMonthMessage}\n\n${usersAllMessage}`;
  ctx.reply(message, {
    parse_mode: "HTML",
  });
}
