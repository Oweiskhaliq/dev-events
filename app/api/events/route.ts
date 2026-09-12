import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";
import { uploadImage } from "@/lib/uploadImage";

const MAX_REQUEST_SIZE_BYTES = 4.5 * 1024 * 1024;
const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function hasSignature(bytes: Uint8Array, signature: number[], offset = 0) {
  return signature.every((byte, index) => bytes[offset + index] === byte);
}

function detectImageType(bytes: Uint8Array) {
  if (hasSignature(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return "image/png";
  }

  if (hasSignature(bytes, [0xff, 0xd8, 0xff])) {
    return "image/jpeg";
  }

  if (
    hasSignature(bytes, [0x47, 0x49, 0x46, 0x38, 0x37, 0x61]) ||
    hasSignature(bytes, [0x47, 0x49, 0x46, 0x38, 0x39, 0x61])
  ) {
    return "image/gif";
  }

  if (
    hasSignature(bytes, [0x52, 0x49, 0x46, 0x46]) &&
    hasSignature(bytes, [0x57, 0x45, 0x42, 0x50], 8)
  ) {
    return "image/webp";
  }

  if (
    hasSignature(bytes, [0x66, 0x74, 0x79, 0x70], 4) &&
    (hasSignature(bytes, [0x61, 0x76, 0x69, 0x66], 8) ||
      hasSignature(bytes, [0x61, 0x76, 0x69, 0x73], 8))
  ) {
    return "image/avif";
  }

  return null;
}

export async function POST(req: NextRequest) {
   console.log("🔥 CREATE EVENT API HIT");
  try {
    const contentLength = Number(req.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_SIZE_BYTES) {
      return NextResponse.json(
        { message: "Request payload is too large" },
        { status: 413 }
      );
    }

    // 1. Establish database connection
    await connectToDatabase();

    // 2. Parse multi-part form data safely
    const formData = await req.formData();
  
    
    // 3. Flatten form key/value pairs into a clean JavaScript object
    const eventData = Object.fromEntries(formData.entries());

    //uploading image to cloudinery 
    const file = formData.get("image");
    if (!(file instanceof File)) {
  return NextResponse.json(
    { message: "Image file required" },
    { status: 400 }
  );
}
    const uploadResult = await uploadImage(file as File);
    
    eventData.image = uploadResult.secure_url as string;

    const tags = JSON.parse(formData.get("tags") as string);
    const agenda = JSON.parse(formData.get("agenda") as string);
    // 4. Save records directly to your Mongoose schema template
    let createdEvent;
    try {
      createdEvent = await Event.create({
        ...eventData,
        tags:tags,
        agenda:agenda
      });
    } catch (persistenceError) {
      try {
        await cloudinary.uploader.destroy(uploadResult.public_id);
      } catch (cleanupError) {
        console.error("Failed to remove orphaned Cloudinary image:", cleanupError);
      }

      throw persistenceError;
    }

    // ✅ Return path 1: Success creation response
    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("API Error creating event:", error);

    // ✅ Return path 2: Error handling fallback
    return NextResponse.json(
      { message: "Error creating event" },
      { status: 500 }
    );
  }
}

export async function GET() {
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
      { message: "Error fetching events" },
      { status: 500 }
    );
  }
}
