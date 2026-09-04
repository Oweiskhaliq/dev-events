import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import {v2 as cloudinary} from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    // 1. Establish database connection
    await connectToDatabase();

    // 2. Parse multi-part form data safely
    const formData = await req.formData();
  
    
    // 3. Flatten form key/value pairs into a clean JavaScript object
    const eventData = Object.fromEntries(formData.entries());

    //uploading image to cloudinery 
    const file = await formData.get("image") as File;
    if (!file) return NextResponse.json({ message: "image file required" }, { status: 400 });

    let tags = JSON.parse(formData.get("tags") as string);
    let agenda = JSON.parse(formData.get("agenda") as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
 
    //uploading image to cloudinary 
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({resource_type: 'image',folder: 'DevEvent'},(error,result) => {
        if(error) return reject(error);
        resolve(result);
      }).end(buffer);
    });
    
    eventData.image = (uploadResult as {secure_url: string}).secure_url;

    // 4. Save records directly to your Mongoose schema template
    const createdEvent = await Event.create({
      ...eventData,
      tags:tags,
      agenda:agenda
    });

    // ✅ Return path 1: Success creation response
    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("API Error creating event:", error);

    // ✅ Return path 2: Error handling fallback
    return NextResponse.json(
      { 
        message: "Error creating event", 
        error: error instanceof Error ? error.message : "unknown" 
      }, 
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1. Establish database connection
    await connectToDatabase();

    // 2. Fetch all events from the database
    const events = await Event.find().sort({createdAt: -1});

    // 3. Return the events as a JSON response
    return NextResponse.json({ message: "events fetch successfully",events }, { status: 200 });
  } catch (error) {
    console.error("API Error fetching events:", error);

    // ✅ Return path 2: Error handling fallback
    return NextResponse.json(
      { message: "Error fetching events", error: error instanceof Error ? error.message : "unknown" },
      { status: 500 }
    );
  }
}
