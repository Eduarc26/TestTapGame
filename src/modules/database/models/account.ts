import { IDailyBoost, ILevelUpBoost, IUser } from "@/lib/types";
import mongoose from "mongoose";

const dailyBoostSchema = new mongoose.Schema<IDailyBoost>({
  type: { type: String, required: true },
  available: { type: Number, default: 3, required: true },
  lastReset: { type: Date, default: Date.now, required: true },
});

const levelUpBoostSchema = new mongoose.Schema<ILevelUpBoost>({
  type: { type: String, required: true },
  level: { type: Number, default: 1, required: true },
  maxLevel: { type: Number, default: 3, required: true },
  cost: { type: Number, default: 100, required: true },
});

const accountSchema = new mongoose.Schema<IUser>({
  id: {
    type: Number,
    required: true,
  },
  avatarColor: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  perClick: {
    type: Number,
    default: 1,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    default: "",
  },
  invitedBy: {
    type: Number,
    required: false,
  },
  refsList: {
    type: [Number],
    default: [],
    required: true,
  },
  clickLimit: {
    type: Number,
    default: 600,
    required: true,
  },
  lastClicked: {
    type: Date,
    required: false,
  },
  claimingTasks: {
    type: [Number],
    default: [],
    required: true,
  },
  completedTasks: {
    type: [Number],
    default: [],
    required: true,
  },
  bonusBalance: {
    type: Number,
    default: 0,
    required: true,
  },
  ip: {
    type: String,
    required: false,
  },
  registeredAt: { type: Date, default: Date.now },
  dailyBoosts: { type: [dailyBoostSchema], default: [] },
  levelUpBoosts: { type: [levelUpBoostSchema], default: [] },
  energyRecoveryPerSecond: {
    type: Number,
    default: 1,
  },
});

const Account =
  mongoose.models.Account || mongoose.model<IUser>("Account", accountSchema);

export default Account;
