import { Scenes } from "telegraf";
import { BotContext } from "../types";
import Account from "@/modules/database/models/account";

const updateBalance = new Scenes.BaseScene<BotContext>("updateBalance");

updateBalance.enter((ctx) => {
  ctx.session.updateBalance = {};
  ctx.reply("<b>Введите ID юзера</b>\n\nДля отмены напишите /cancel", {
    parse_mode: "HTML",
  });
});

updateBalance.command("cancel", async (ctx) => {
  await ctx.reply("<b>Изменение баланса отменено</b>", {
    parse_mode: "HTML",
  });
  await ctx.scene.leave();
});

updateBalance.on("text", async (ctx) => {
  if (!ctx.session.updateBalance) {
    ctx.session.updateBalance = {};
  }
  const param = ctx.message.text;
  if (!ctx.session.updateBalance.id) {
    try {
      if (isNaN(Number(param))) {
        await ctx.reply("<b>Неверный формат ID</b>", {
          parse_mode: "HTML",
        });
        await ctx.scene.leave();
        return;
      }
      const user = await Account.findOne({ id: Number(param) });
      if (!user) {
        await ctx.reply("<b>Пользователь не найден</b>", {
          parse_mode: "HTML",
        });
        await ctx.scene.leave();
        return;
      }
      ctx.session.updateBalance.id = Number(param);
      await ctx.reply("<b>Пользователь найден. Введите новый баланс</b>", {
        parse_mode: "HTML",
      });
    } catch (error) {
      ctx.reply("<b>Произошла ошибка при обновлении баланса</b>", {
        parse_mode: "HTML",
      });
    }
    return;
  }
  if (ctx.session.updateBalance.id) {
    const newBalance = parseFloat(param);
    if (isNaN(newBalance)) {
      await ctx.reply("<b>Неверный формат баланса</b>", {
        parse_mode: "HTML",
      });
      return;
    }
    try {
      const user = await Account.findOne({ id: ctx.session.updateBalance.id });
      if (!user) {
        await ctx.reply("<b>Пользователь не найден</b>", {
          parse_mode: "HTML",
        });
        await ctx.scene.leave();
        return;
      }

      user.balance = newBalance;
      await user.save();

      await ctx.reply(
        `<b>Баланс пользователя с ID ${
          user.id
        } успешно обновлен до ${newBalance.toFixed(4)}</b>`,
        {
          parse_mode: "HTML",
        }
      );
    } catch (error) {
      ctx.reply("<b>Произошла ошибка при обновлении баланса</b>", {
        parse_mode: "HTML",
      });
    }
    await ctx.scene.leave();
  }
});

export { updateBalance };
