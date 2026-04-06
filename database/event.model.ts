import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, enum: ['online', 'offline', 'hybrid'], required: true },
    audience: { type: String, required: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

// Slug helper
const generateSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Pre-save for slug and normalization
eventSchema.pre('save', function (this: IEvent) {
  if (this.isModified('title')) {
    this.slug = generateSlug(this.title);
  }

  // ISO Date normalization
  if (this.isModified('date')) {
    const d = new Date(this.date);
    if (isNaN(d.getTime())) {
      throw new Error('Invalid date format');
    }
    this.date = d.toISOString().split('T')[0];
  }

  // Time format validation
  if (this.isModified('time')) {
    const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!timeRegex.test(this.time)) {
      throw new Error('Invalid time (HH:mm)');
    }
  }
});

eventSchema.index({ slug: 1 });

const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
export default Event;