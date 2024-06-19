import { Context, MiddlewareFn } from "telegraf";
const allowedUsers = process.env.ADMINS_IDS
  ? process.env.ADMINS_IDS.split(",").map((id) => parseInt(id, 10))
  : [];

const adminAccess: MiddlewareFn<Context> = (ctx, next) => {
  if (ctx.from && allowedUsers.includes(ctx.from.id)) {
    return next();
  }
};

export default adminAccess;
