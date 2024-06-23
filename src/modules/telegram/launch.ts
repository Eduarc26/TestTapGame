"use server";
import { Telegraf, Scenes, session } from "telegraf";
import { connectToMongoDB } from "../database/connect";
import start from "./commands/start";
import { BotContext } from "./types";
import { createTaskScene } from "./scenes/create-task";
import { findTaskScene } from "./scenes/find-task";
import { broadcast } from "./scenes/broadcast";
import deleteTask from "./commands/delete-task";
import adminAccess from "./middleware/admin-access";
import help from "./commands/help";
import registerStats from "./commands/register-stats";
import { findUserScene } from "./scenes/find-user";
import { updateBalance } from "./scenes/update-balance";
let botLaunched = false;

const bot = new Telegraf<BotContext>(process.env.TOKEN!);

const stage = new Scenes.Stage<BotContext>([
  createTaskScene,
  findTaskScene,
  broadcast,
  findUserScene,
  updateBalance,
]);
bot.use(session());
bot.use(stage.middleware());

bot.command("createTask", adminAccess, (ctx) => ctx.scene.enter("createTask"));
bot.command("findTask", adminAccess, (ctx) => ctx.scene.enter("findTask"));
bot.command("findUser", adminAccess, (ctx) => ctx.scene.enter("findUser"));
bot.command("updateBalance", adminAccess, (ctx) =>
  ctx.scene.enter("updateBalance")
);

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

bot.command("broadcast", adminAccess, (ctx) => ctx.scene.enter("broadcast"));

bot.help(adminAccess, async (ctx) => await help(ctx));

export async function botRun() {
  if (botLaunched) return;
  botLaunched = true;
  connectToMongoDB();
  await bot.launch();
}

export default bot;
