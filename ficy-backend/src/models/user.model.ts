import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", userSchema);
