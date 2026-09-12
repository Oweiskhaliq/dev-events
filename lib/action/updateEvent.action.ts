

"use server";
import { connectToDatabase } from "../mongodb";
import Event from "../../database/event.model";
import { connection } from "next/server";

export const GetSingleEvent = async (eventId: string) => {
    try {
        await connection(); // Safely keeps the route segment dynamic under cacheComponents
        await connectToDatabase();
        
        // 1. Get raw plain data from MongoDB
        const eventData = await Event.findOne({ _id: eventId }).lean();

        if (!eventData) {
            return { success: false, message: "Event not found" };
        }
        
        // 2. Safe deeply-nested serialization for Next.js Server Components
        const serializedEvent = JSON.parse(JSON.stringify(eventData));
      
        // 3. Return a consistent structure
        return { 
            success: true, 
            data: serializedEvent 
        };    
        
    } catch (error) {
        console.error("Error fetching event:", error);
        return { success: false, message: "Failed to fetch event data" };
    }
}




