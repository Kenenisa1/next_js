import mongoose, { Schema, models, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  clerkId: string; // ID from Clerk/Auth provider for synchronization
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation: number;
  role: "user" | "organizer" | "admin";
  saved: Types.ObjectId[]; // References to Event model
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  role: { 
    type: String, 
    enum: ["user", "organizer", "admin"], 
    default: "user" 
  },
  saved: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;