import createUser from "@/actions/create-user";
import updateRefs from "@/actions/update-refs";
import userExists from "@/actions/user-exists";
import { type Context } from "telegraf";

const baseUrl = process.env.BASE_URL!;
const token = process.env.TOKEN!;
const appName = process.env.NEXT_PUBLIC_APP_NAME!;
const webAppButton = [
  [
    {
      text: "🚀 Start earn more",
      web_app: {
        url: baseUrl,
      },
    },
  ],
];

const webAppButtonRefs = (id: number) => {
  return [
    [
      {
        text: "🌼 Explore your frens",
        web_app: {
          url: `${baseUrl}/earn/friends/${id}`,
        },
      },
    ],
  ];
};

const getUserAvatar = async (ctx: Context, id: number) => {
  const avatarResponse = await ctx.telegram.getUserProfilePhotos(id, 1, 1);
  const fileId = avatarResponse.photos[0][0].file_id;
  const file = await ctx.telegram.getFile(fileId);
  const filePath = file.file_path;
  const photoUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;
  ctx.telegram.sendMessage(id, photoUrl);
};

export default async function start(ctx: Context, message: string) {
  if (!ctx.from) return;
  const id = ctx.from.id;
  const username = ctx.from.username;
  const firstName = ctx.from.first_name;
  const invitedBy = Number(message.split(" ")[1]);
  try {
    const exists = await userExists(id);
    if (exists)
      return await ctx.reply(`👋 <b>Привет, ${username || firstName}!</b>`, {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: webAppButton,
        },
      });

    if (!invitedBy || id === invitedBy) {
      await createUser({
        id: ctx.from.id,
        invitedBy: null,
        name: ctx.from.first_name || ctx.from.username || "",
      });
      return await ctx.reply(
        `👋 <b>Добро пожаловать, ${username || firstName}!</b>`,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: webAppButton,
          },
        }
      );
    }
    const inviterExists = await userExists(invitedBy);
    if (!inviterExists) {
      await createUser({
        id: ctx.from.id,
        invitedBy: null,
        name: ctx.from.first_name || ctx.from.username || "",
      });
      return await ctx.reply(
        `👋 <b>Добро пожаловать, ${username || firstName}!</b>`,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: webAppButton,
          },
        }
      );
    }
    await createUser({
      id: ctx.from.id,
      invitedBy: invitedBy,
      name: ctx.from.first_name || ctx.from.username || "",
    });

    await ctx.reply(`👋 <b>Добро пожаловать, ${username || firstName}!</b>`, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: webAppButton,
      },
    });
    await updateRefs(invitedBy, id);
    await ctx.telegram.sendMessage(
      invitedBy,
      `<b>Наконец то! ${
        ctx.from.first_name || ctx.from.username
      } присоединился к фарму ${appName}!</b>`,
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: webAppButtonRefs(invitedBy),
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
