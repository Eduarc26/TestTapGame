import { Scenes } from "telegraf";
import { BotContext } from "../types";
import createTask from "@/actions/create-task";
import { generateRandomNumber } from "@/lib/utils";

const createTaskScene = new Scenes.BaseScene<BotContext>("createTask");
const currency = process.env.NEXT_PUBLIC_CURRENCY;
createTaskScene.enter((ctx) => {
  ctx.session.createTask = {};
  ctx.reply(
    "<b>Введите заголовок задания</b>\n\nДля отмены напишите <code>/cancel</code>",
    {
      parse_mode: "HTML",
    }
  );
});
createTaskScene.command("cancel", async (ctx) => {
  await ctx.reply("<b>Создание задания отменено</b>", {
    parse_mode: "HTML",
  });
  await ctx.scene.leave();
});

createTaskScene.on("text", async (ctx) => {
  if (!ctx.session.createTask) {
    ctx.session.createTask = {};
  }

  const answersCount = Object.keys(ctx.session.createTask).filter(
    (key) =>
      ctx.session.createTask![key as keyof typeof ctx.session.createTask] !==
      undefined
  ).length;

  switch (answersCount) {
    case 0:
      ctx.session.createTask.title = ctx.message.text;
      await ctx.reply(
        "<b>Напишите короткое описание задания</b>\n\nЧтобы пропустить оправьте <code>-</code>",
        {
          parse_mode: "HTML",
        }
      );
      break;
    case 1:
      ctx.session.createTask.description = ctx.message.text;
      await ctx.reply(
        "<b>Отправьте URL логотипа</b>\n\nОбратите внимание, нужен прямой URL на изображение, в противном случае логотип не будет отображаться корректно",
        {
          parse_mode: "HTML",
        }
      );
      break;
    case 2:
      ctx.session.createTask.logoUrl = ctx.message.text;
      await ctx.reply(
        "<b>Напишите количество гемов за выполнение</b>\n\nНапример: 150",
        {
          parse_mode: "HTML",
        }
      );
      break;
    case 3:
      ctx.session.createTask.reward = ctx.message.text;
      await ctx.reply("<b>Отправьте ссылку для перехода</b>", {
        parse_mode: "HTML",
      });
      break;
    case 4:
      ctx.session.createTask.link = ctx.message.text;
      await ctx.reply("<b>Задание от партнера?</b>", {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅",
                callback_data: "partner_yes",
              },
              {
                text: "❌",
                callback_data: "partner_no",
              },
            ],
          ],
        },
      });
      break;
  }
});

createTaskScene.action("partner_yes", async (ctx) => {
  ctx.answerCbQuery("");
  ctx.session.createTask!.partner = true;
  const title = ctx.session.createTask?.title;
  const description = ctx.session.createTask?.description;
  const amount = ctx.session.createTask?.reward;
  const logo = ctx.session.createTask?.logoUrl;
  const link = ctx.session.createTask?.link;
  if (isNaN(Number(amount))) {
    await ctx.reply("<b>Неверный формат награды за выполнение</b>", {
      parse_mode: "HTML",
    });
    await ctx.scene.leave();
    return;
  }
  if (!logo?.startsWith("https")) {
    await ctx.reply("<b>Неверный формат URL логотипа</b>", {
      parse_mode: "HTML",
    });
    await ctx.scene.leave();
    return;
  }
  const descriptionMessage =
    `<b>Описание: </b>` +
    (description === "-" ? " " : `<code>${description}</code>`);
  const links = `<a href="${logo}">Логотип</a> | <a href="${link}">Переход</a>`;
  const amountMessage = `<b>Награда:</b> <code>${amount} ${currency}</code>`;
  const partnerMessage = `<b>Задание от партнера:</b> <code>Да</code>`;
  const message = `<b>Подтвердите создание</b>\n\n<b>Заголовок:</b> <code>${title}</code>\n${descriptionMessage}\n${amountMessage}\n${partnerMessage}\n\n${links}`;
  await ctx.reply(message, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Создать",
            callback_data: "create-task",
          },
          {
            text: "Отменить",
            callback_data: "cancel-task",
          },
        ],
      ],
    },
  });
});

createTaskScene.action("partner_no", async (ctx) => {
  ctx.answerCbQuery("");
  ctx.session.createTask!.partner = false;
  const title = ctx.session.createTask?.title;
  const description = ctx.session.createTask?.description;
  const amount = ctx.session.createTask?.reward;
  const logo = ctx.session.createTask?.logoUrl;
  const link = ctx.session.createTask?.link;
  if (isNaN(Number(amount))) {
    await ctx.reply("<b>Неверный формат награды за выполнение</b>", {
      parse_mode: "HTML",
    });
    await ctx.scene.leave();
    return;
  }
  if (!logo?.startsWith("https")) {
    await ctx.reply("<b>Неверный формат URL логотипа</b>", {
      parse_mode: "HTML",
    });
    await ctx.scene.leave();
    return;
  }
  const descriptionMessage =
    `<b>Описание: </b>` +
    (description === "-" ? " " : `<code>${description}</code>`);
  const links = `<a href="${logo}">Логотип</a> | <a href="${link}">Переход</a>`;
  const amountMessage = `<b>Награда:</b> <code>${amount} ${currency}</code>`;
  const partnerMessage = `<b>Задание от партнера:</b> <code>Да</code>`;
  const message = `<b>Подтвердите создание</b>\n\n<b>Заголовок:</b> <code>${title}</code>\n${descriptionMessage}\n${amountMessage}\n${partnerMessage}\n\n${links}`;
  await ctx.reply(message, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Создать",
            callback_data: "create-task",
          },
          {
            text: "Отменить",
            callback_data: "cancel-task",
          },
        ],
      ],
    },
  });
});

createTaskScene.action("create-task", async (ctx) => {
  ctx.answerCbQuery("");
  const title = ctx.session.createTask?.title;
  const description = ctx.session.createTask?.description;
  const amount = ctx.session.createTask?.reward;
  const logo = ctx.session.createTask?.logoUrl;
  const link = ctx.session.createTask?.link;
  const partner = ctx.session.createTask?.partner;
  const id = generateRandomNumber(6);
  const createdTask = await createTask({
    id,
    amount: Number(amount),
    description: description!,
    link: link!,
    logo: logo!,
    partner: !!partner,
    password: "123451",
    title: title!,
  });
  if (!createdTask) {
    await ctx.reply("<b>Произошла ошибка при создании задания</b>", {
      parse_mode: "HTML",
    });
    await ctx.scene.leave();
    return;
  }
  await ctx.reply(`<b>Задание <code>${id}</code> успешно создано!</b>`, {
    parse_mode: "HTML",
  });
});
createTaskScene.action("cancel-task", async (ctx) => {
  ctx.answerCbQuery("");
  await ctx.reply("<b>Создание задания отменено</b>", {
    parse_mode: "HTML",
  });
  await ctx.scene.leave();
});

export { createTaskScene };
