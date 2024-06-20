"use server";
import { Telegraf, Scenes, session } from "telegraf";
import { connectToMongoDB } from "../database/connect";
import start from "./commands/start";
import { BotContext } from "./types";
import { createTaskScene } from "./scenes/create-task";
import { findTaskScene } from "./scenes/find-task";
import deleteTask from "./commands/delete-task";
import adminAccess from "./middleware/admin-access";
import help from "./commands/help";

import registerStats from "./commands/register-stats";
let botLaunched = false;

const bot = new Telegraf<BotContext>(process.env.TOKEN!);

const stage = new Scenes.Stage<BotContext>([createTaskScene, findTaskScene]);
bot.use(session());
bot.use(stage.middleware());

bot.command("createTask", adminAccess, (ctx) => ctx.scene.enter("createTask"));
bot.command("findTask", adminAccess, (ctx) => ctx.scene.enter("findTask"));

bot.start(async (ctx) => await start(ctx, ctx.message.text));
bot.command(
  "deleteTask",
  adminAccess,
  async (ctx) => await deleteTask(ctx, ctx.message.text)
);

bot.command(
  "registerStats",
  adminAccess,
  async (ctx) => await registerStats(ctx)
);
bot.help(adminAccess, async (ctx) => await help(ctx));
bot.command("test", async (ctx) => {
  const channel = "@publlic_channell";
  const chatMember = await ctx.telegram.getChatMember(channel, ctx.from.id);
  console.log(chatMember.status);
  if (
    chatMember.status !== "member" &&
    chatMember.status !== "administrator" &&
    chatMember.status !== "creator"
  ) {
    await ctx.reply(`Привет, подпишись на канал - ${channel}`);
    return;
  }
  await ctx.reply("Привет, ты подписан на канал");
});

bot.on("sticker", async (ctx) => await ctx.reply("👍"));
bot.hears("hi", async (ctx) => await ctx.reply("Hey there"));

export async function botRun() {
  if (botLaunched) return;
  botLaunched = true;
  connectToMongoDB();
  await bot.launch();
}

export default bot;
