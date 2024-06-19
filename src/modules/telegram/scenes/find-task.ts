import { Scenes } from "telegraf";
import { BotContext } from "../types";
import findTask from "@/actions/find-task";

const findTaskScene = new Scenes.BaseScene<BotContext>("findTask");
const currency = process.env.NEXT_PUBLIC_CURRENCY;

findTaskScene.enter((ctx) => {
  ctx.session.findTask = {};
  ctx.reply(
    "<b>Введите заголовок либо ID задания</b>\n\n<b>Обратите внимание, поиск по заголовку не является строгим. Для отмены напишите /cancel</b>",
    {
      parse_mode: "HTML",
    }
  );
});

findTaskScene.command("cancel", async (ctx) => {
  await ctx.reply("<b>Поиск задания отменен</b>", {
    parse_mode: "HTML",
  });
  await ctx.scene.leave();
});

findTaskScene.on("text", async (ctx) => {
  if (!ctx.session.findTask) {
    ctx.session.findTask = {};
  }
  ctx.session.findTask.taskParam = ctx.message.text;

  const taskParam = ctx.session.findTask.taskParam;
  const result = await findTask(taskParam);
  if (!result.success) {
    await ctx.reply(`<b>Произошла ошибка при поиске задания</b>`, {
      parse_mode: "HTML",
    });
    await ctx.scene.leave();
    return;
  }
  if (result.tasks.length === 0) {
    await ctx.reply(
      `<b>Не удалось найти задание с ID либо заголовком:</b>\n\n<code>${taskParam}</code>`,
      {
        parse_mode: "HTML",
      }
    );
    await ctx.scene.leave();
    return;
  }
  const foundTasksMessageTitle = `<b>Найдено задач: ${result.tasks.length}</b>`;
  await ctx.reply(foundTasksMessageTitle, {
    parse_mode: "HTML",
  });
  for (const task of result.tasks) {
    const { title, description, amount, logo, link, partner, id } = task;
    const descriptionMessage =
      `<b>Описание: </b>` +
      (description === "-" ? " " : `<code>${description}</code>`);
    const links = `<a href="${logo}">Логотип</a> | <a href="${link}">Переход</a>`;
    const amountMessage = `<b>Награда:</b> <code>${amount} ${currency}</code>`;
    const partnerMessage = `<b>Задание от партнера:</b> <code>${
      partner ? "Да" : "Нет"
    }</code>`;
    const message = `<b>Задание <code>${id}</code></b>\n\n<b>Заголовок:</b> <code>${title}</code>\n${descriptionMessage}\n${amountMessage}\n${partnerMessage}\n\n${links}`;
    await ctx.reply(message, {
      parse_mode: "HTML",
    });
  }
  await ctx.scene.leave();
});

export { findTaskScene };
