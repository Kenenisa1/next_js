import { Schema, models, model, Document } from "mongoose";

/**
 * Interface for the Subscriber document
 * ensures type safety throughout your Next.js app
 */
export interface ISubscriber extends Document {
  email: string;
  createdAt: Date;
  active: boolean; // Useful for unsubscribing logic later
}

const SubscriberSchema = new Schema({
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, // Prevents duplicate subscriptions
    lowercase: true, 
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  active: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

/**
 * Next.js specific model check: 
 * Prevents re-defining the model during Hot Module Replacement (HMR)
 */
const Subscriber = models.Subscriber || model("Subscriber", SubscriberSchema);

export default Subscriber;