import mongoose, { Document, Schema, Model, Types } from "mongoose";

export interface IEvent extends Omit<Document, "_id"> {
  _id: Types.ObjectId | string;
  title: { en: string; am?: string; si?: string };
  description: { en: string; am?: string; si?: string };
  overview: { en: string; am?: string; si?: string };
  agenda: Array<{ en: string; am?: string; si?: string }>;
  slug: string;
  hub: string; 
  image: string; 
  gallery: string[];
  venue: string; 
  location: string; 
  date: string; 
  time: string; 
  mode: "online" | "offline" | "hybrid";
  category: "Technology" | "Culture" | "Business" | "Sports";
  status: "draft" | "published" | "sold-out" | "archived";
  totalCapacity: number;
  soldCount: number;
  audience: string;
  organizer: string; 
  tags: string[];
  isFeatured: boolean;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      en: { type: String, required: true },
      am: { type: String },
      si: { type: String },
    },
    slug: { type: String, unique: true, index: true },
    description: {
      en: { type: String, required: true },
      am: { type: String },
      si: { type: String },
    },
    overview: {
      en: { type: String, required: true },
      am: { type: String },
      si: { type: String },
    },
    hub: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
      default: "offline",
    },
    category: {
      type: String,
      enum: ["Technology", "Culture", "Business", "Sports"],
      default: "Technology",
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "sold-out", "archived"],
      default: "draft",
    },
    totalCapacity: { type: Number, required: true, default: 0 },
    soldCount: { type: Number, default: 0 },
    audience: { type: String, required: true },
    agenda: [
      {
        en: { type: String },
        am: { type: String },
        si: { type: String },
      },
    ],
    organizer: { type: String, required: true },
    tags: { type: [String], required: true },
    isFeatured: { type: Boolean, default: false },
    price: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * SLUG GENERATOR
 */
const generateSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * ASYNC MIDDLEWARE (Clean Async/Await Pattern)
 */
eventSchema.pre<IEvent>("save", async function () {
  // 1. Slug handling
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title.en);
  }

  // 2. Date normalization
  if (this.isModified("date")) {
    const d = new Date(this.date);
    if (!isNaN(d.getTime())) {
      this.date = d.toISOString().split("T")[0];
    }
  }

  // 3. Time validation
  if (this.isModified("time")) {
    const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!timeRegex.test(this.time)) {
      throw new Error("Invalid time format (HH:mm)");
    }
  }
  
  // No next() needed here; the resolved promise triggers the next step.
});

eventSchema.index({ category: 1, date: 1 });

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default Event;