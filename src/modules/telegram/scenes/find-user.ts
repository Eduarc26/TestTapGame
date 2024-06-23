import { Scenes } from "telegraf";
import { BotContext } from "../types";
import findUser from "@/actions/find-user";
import { format } from "date-fns";

const findUserScene = new Scenes.BaseScene<BotContext>("findUser");

findUserScene.enter((ctx) => {
  ctx.session.findUser = {};
  ctx.reply(
    "<b>Введите username либо ID юзера</b>\n\nДля отмены напишите /cancel",
    {
      parse_mode: "HTML",
    }
  );
});

findUserScene.command("cancel", async (ctx) => {
  await ctx.reply("<b>Поиск юзера отменен</b>", {
    parse_mode: "HTML",
  });
  await ctx.scene.leave();
});

findUserScene.on("text", async (ctx) => {
  const param = ctx.message.text;

  try {
    const user = await findUser(param);
    if (!user) {
      await ctx.reply("<b>Пользователь не найден</b>", {
        parse_mode: "HTML",
      });
      await ctx.scene.leave();
      return;
    }
    const formattedDate = format(
      new Date(user.registeredAt),
      "dd.MM.yy в HH:mm"
    );

    const ipList = user.ip ?? "Неизвестно";

    const message = `<b>Пользователь найден:</b>\n\n<b>ID: <code>${
      user.id
    }</code></b>\n<b>Юзернейм:</b> ${user.username ?? "-"}\n<b>Имя: ${
      user.name
    }</b>\n<b>Баланс: ${user.balance.toFixed(4)}</b>\n<b>Приглашен: <code>${
      user.invitedBy ?? "Никем"
    }</code></b>\n<b>Количество рефералов: <code>${
      user.refsList.length
    }</code></b>\n<b>Выполнил заданий: <code>${
      user.completedTasks.length
    }</code></b>\n\n<b>Последний IP адрес:</b> <code>${ipList}</code>\n<b>Зарегистрирован: ${formattedDate}</b>`;
    ctx.reply(message, {
      parse_mode: "HTML",
    });
  } catch (error) {
    ctx.reply("<b>Произошла ошибка при поиске юзера</b>", {
      parse_mode: "HTML",
    });
  }
  await ctx.scene.leave();
});

export { findUserScene };
