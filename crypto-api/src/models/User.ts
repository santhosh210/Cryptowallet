import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  refreshToken?: string; // Optional refreshToken property
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }, // Add refreshToken property to the schema
});

export default mongoose.model<IUser>('User', UserSchema);
