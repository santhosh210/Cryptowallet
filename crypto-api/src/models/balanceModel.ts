import mongoose, { Document } from "mongoose";

export interface IBalance extends Document {
  currency: string;
  total: number;
  available: number;
  inOrder: number;
  lock: number;
  svgImage: string;
}

const balanceSchema = new mongoose.Schema({
  currency: { type: String, required: true, unique: true },
  total: { type: Number, required: true },
  available: { type: Number, required: true },
  inOrder: { type: Number, required: true },
  lock: { type: Number, required: true },
  svgImage: { type: String, required: true },
});

export const Balance = mongoose.model<IBalance>("Balance", balanceSchema);
