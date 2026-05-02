import { Schema, model, models, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  subject?: string;
  category: "general" | "partnership" | "membership" | "support";
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  ipAddress?: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"],
      trim: true 
    },
    subject: { 
      type: String, 
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"],
      lowercase: true,
      trim: true 
    },
    category: { 
      type: String, 
      enum: ["general", "partnership", "membership", "support"],
      default: "general" 
    },
    message: { 
      type: String, 
      required: [true, "Message content is required"],
      minlength: [10, "Message must be at least 10 characters long"]
    },
    status: { 
      type: String, 
      enum: ["unread", "read", "replied", "archived"],
      default: "unread" 
    },
    ipAddress: { 
      type: String // Optional: Useful for identifying/blocking spam bots
    },
  },
  { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

const Contact = models.Contact || model<IContact>("Contact", ContactSchema);

export default Contact;