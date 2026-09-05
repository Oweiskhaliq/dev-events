"use server";

import { isValidObjectId } from "mongoose";
import Booking from "@/database/booking.model";
import { connectToDatabase } from "@/lib/mongodb";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type BookingResult =
  | { success: true }
  | { success: false; message: string };

export async function createBooking(
  eventId: string,
  email: string
): Promise<BookingResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidObjectId(eventId)) {
    return { success: false, message: "Invalid event" };
  }

  if (!EMAIL_REGEX.test(normalizedEmail) || normalizedEmail.length > 254) {
    return { success: false, message: "Enter a valid email address" };
  }

  try {
    await connectToDatabase();
    await Booking.create({ eventId, email: normalizedEmail });
    return { success: true };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, message: "Unable to complete booking" };
  }
}
