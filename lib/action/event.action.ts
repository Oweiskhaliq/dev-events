import "server-only";

import { connectToDatabase } from "../mongodb";
import Event from "../../database/event.model";
import Booking from "../../database/booking.model";

const serializeEvent = <T extends {
  _id: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
}>(event: T) => ({
  ...event,
  _id: event._id.toString(),
  createdAt: event.createdAt.toISOString(),
  updatedAt: event.updatedAt.toISOString(),
});

export const getEvents = async (currentPage: number,itemsPerPage: number) => {
  await connectToDatabase();
  let [events,totalEvent] = await Promise.all([
    Event.find().sort({ createdAt: -1 }).limit(itemsPerPage).skip((currentPage - 1) * itemsPerPage)
  .lean(),
    Event.countDocuments(),

  ])
 
  
  const totalPages = Math.ceil(totalEvent / itemsPerPage);
  return {
    events: events.map(serializeEvent),
    totalPages,
  };
};

export const getEventBySlug = async (slug: string) => {
  await connectToDatabase();
  const event = await Event.findOne({ slug: slug.trim().toLowerCase() }).lean();

  return event ? serializeEvent(event) : null;
};

export const getBookingCount = async (eventId: string) => {
  await connectToDatabase();
  return Booking.countDocuments({ eventId });
};

export const getSimilarEventsBySlug = async (slug: string) => {
 try {
    await connectToDatabase();
    const event = await Event.findOne({ slug: slug.trim().toLowerCase() });
    if (!event) return [];
  
    
     const similarEvents = await Event.find({
         _id: { $ne: event._id },
         tags: { $in: event.tags },
         }).lean();

         

    return similarEvents.map(serializeEvent);
    
 } catch {
    return []
 }
};
