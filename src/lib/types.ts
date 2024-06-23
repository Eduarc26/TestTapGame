export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

export interface IWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: ITelegramUser;
    auth_date: string;
    hash: string;
  };
  openLink: (link: string) => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  showAlert: (message: string, cb?: () => void) => void;
  showPopup: (params: { title: string; message: string }) => void;
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: {
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
    hint_color: string;
    bg_color: string;
    text_color: string;
  };
  isExpanded: boolean;
  expand: () => void;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
  };
  HapticFeedback: any;
  CloudStorage: {
    setItem: (
      key: string,
      value: string,
      callback?: (error: Error | null, success: boolean) => void
    ) => void;
    getItem: (
      key: string,
      callback: (error: Error | null, value: string | null) => void
    ) => void;
    getItems: (
      keys: string[],
      callback: (
        error: Error | null,
        values: { [key: string]: string | null }
      ) => void
    ) => void;
    removeItem: (
      key: string,
      callback?: (error: Error | null, success: boolean) => void
    ) => void;
    removeItems: (
      keys: string[],
      callback?: (error: Error | null, success: boolean) => void
    ) => void;
    getKeys: (callback: (error: Error | null, keys: string[]) => void) => void;
  };
  viewportChanged: any;
  // ) => void;
}

export interface Referals {
  id: number;
  avatarColor: string;
  name: string;
  balance: number;
  refs: number;
}

export interface Refs {
  avatar: string;
  name: string;
  refsCount: number;
  balance: number;
}
export interface IDailyBoost {
  type: string;
  available: number;
  lastReset: Date;
}

export interface ILevelUpBoost {
  type: string;
  level: number;
  cost: number;
  maxLevel: number;
}

export interface IUser {
  id: number;
  avatarColor: string;
  name: string;
  perClick: number;
  balance: number;
  lastClicked: Date | null;
  invitedBy: number | null;
  refsList: number[];
  clickLimit: number;
  claimingTasks: number[];
  completedTasks: number[];
  bonusBalance: number;
  username?: string;
  registeredAt: Date;
  dailyBoosts: IDailyBoost[];
  levelUpBoosts: ILevelUpBoost[];
  energyRecoveryPerSecond: number;
  initData?: string;
  ip?: string;
}

export type TaskType = "subscribe";
export type TaskStatus = "open" | "pending" | "claim" | "completed";

export interface Task {
  id: number;
  logo: string;
  title: string;
  description: string;
  type: TaskType;
  link: string;
  status: TaskStatus;
  amount: number;
  partner: boolean;
  subscribe: string | undefined;
}

interface ILevelUpBoostDetails {
  cost: number;
  amount: number;
}

export interface LevelUpBoost {
  [level: number]: ILevelUpBoostDetails;
  maxLevel: number;
}
