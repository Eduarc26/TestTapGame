import { Context, Scenes } from "telegraf";

interface SessionData extends Scenes.SceneSession {
  findTask?: {
    taskParam?: string;
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
}

export interface BotContext extends Context {
  session: SessionData;
  scene: Scenes.SceneContextScene<BotContext>;
}
