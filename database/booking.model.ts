import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Event from "./event.model";

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string): boolean => EMAIL_REGEX.test(value),
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Speeds up queries that retrieve bookings for a specific event.
bookingSchema.index({ eventId: 1 });

bookingSchema.pre("save", async function () {
  // Verify that the referenced event exists before saving the booking.
  const eventExists = await Event.exists({
    _id: this.eventId,
  });

  if (!eventExists) {
    throw new Error("Cannot create booking: Event does not exist");
  }
});

const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;