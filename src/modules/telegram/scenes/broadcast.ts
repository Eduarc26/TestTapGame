import { Scenes, session } from "telegraf";
import { BotContext } from "../types";
import Account from "@/modules/database/models/account";

const broadcast = new Scenes.BaseScene<BotContext>("broadcast");

const users = [994356943, 6067755846];

broadcast.enter((ctx) => {
  ctx.session.broadcast = {};
  ctx.reply(
    "<b>Введите сообщение для рассылки</b>\n\nДля отмены напишите /cancel",
    {
      parse_mode: "HTML",
    }
  );
});

broadcast.command("cancel", async (ctx) => {
  await ctx.reply("<b>Поиск задания отменен</b>", {
    parse_mode: "HTML",
  });
  await ctx.scene.leave();
});

broadcast.on("message", async (ctx) => {
  if (!ctx.session.broadcast) {
    ctx.session.broadcast = {};
  }
  ctx.session.broadcast.messageId = ctx.message.message_id;
  const messageId = ctx.session.broadcast.messageId;
  ctx.session.broadcast.chatId = ctx.chat.id;
  try {
    await ctx.reply("<b>Предпросмотр рассылки:</b>", {
      parse_mode: "HTML",
    });
    await ctx.telegram.copyMessage(ctx.from.id, ctx.chat.id, messageId, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Подтвердить",
              callback_data: "send",
            },
            {
              text: "Отменить",
              callback_data: "cancel",
            },
          ],
        ],
      },
    });
  } catch (error) {}
});

broadcast.action("send", async (ctx) => {
  ctx.answerCbQuery("");
  const messageId = ctx.session.broadcast?.messageId;
  const chatId = ctx.session.broadcast?.chatId;
  let sent = 0;
  let withError = 0;
  const startTime = Date.now();

  if (!messageId || !chatId) {
    await ctx.reply("<b>Произошла ошибка. Рассылка остановлена</b>", {
      parse_mode: "HTML",
    });
    await ctx.scene.leave();
    return;
  }

  try {
    const users = await Account.find();
    if (!users) {
      await ctx.reply(
        "<b>Произошла ошибка при получении списка юзеров. Рассылка остановлена</b>",
        {
          parse_mode: "HTML",
        }
      );
      await ctx.scene.leave();
      return;
    }

    const ids = users.map((user) => user.id);
    const promises = ids.map(async (id) => {
      try {
        await ctx.telegram.copyMessage(id, chatId, messageId);
        sent += 1;
      } catch (error) {
        withError += 1;
        console.error(`Error while sending message to ${id}:`, error);
      }
    });

    await ctx.reply("<b>Рассылка запущена ✅</b>", {
      parse_mode: "HTML",
    });

    await Promise.all(promises);

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    await ctx.reply(
      `<b>Рассылка завершена</b>\n\n<b>Успешно - ${sent}</b>\n<b>С ошибкой - ${withError}</b>\n<B>Длительность: ${duration.toFixed(
        2
      )} секунд</B>`,
      {
        parse_mode: "HTML",
      }
    );
  } catch (error) {
    console.error("Error while sending message:", error);
    await ctx.reply("<b>Ошибка при отправке сообщения</b>", {
      parse_mode: "HTML",
    });
  }

  await ctx.scene.leave();
});

broadcast.action("cancel", async (ctx) => {
  ctx.answerCbQuery("");
  await ctx.reply("<b>Рассылка отменена</b>", {
    parse_mode: "HTML",
  });
  await ctx.scene.leave();
});

export { broadcast };
