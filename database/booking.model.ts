import mongoose, { Document, Schema, Types } from 'mongoose';
import Event from './event.model';

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    email: { 
      type: String, 
      required: true, 
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
      lowercase: true 
    },
  },
  { timestamps: true }
);

// Pre-save for existence validation
bookingSchema.pre('save', async function (this: IBooking) {
  const eventExists = await Event.exists({ _id: this.eventId });
  if (!eventExists) {
    throw new Error('Referenced event does not exist');
  }
});

bookingSchema.index({ eventId: 1 });

const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;