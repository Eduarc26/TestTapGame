import { Context, Scenes } from "telegraf";

interface SessionData extends Scenes.SceneSession {
  findTask?: {
    taskParam?: string;
  };
  findUser?: {
    param?: string;
  };
  createTask?: {
    title?: string;
    description?: string;
    logoUrl?: string;
    link?: string;
    reward?: string;
    partner?: boolean;
    subscribe?: string;
  };
  broadcast?: {
    messageId?: number;
    chatId?: number;
  };
  updateBalance?: {
    id?: number;
    balance?: string;
  };
}

export interface BotContext extends Context {
  session: SessionData;
  scene: Scenes.SceneContextScene<BotContext>;
}
