import { connectToDatabase } from "@/lib/mongodb";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import { uploadImage } from "@/lib/uploadImage";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid event ID" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check event exists
    const existingEvent = await Event.findById(id);

    if (!existingEvent) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    // Get fields
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const overview = formData.get("overview")?.toString();
    const venue = formData.get("venue")?.toString();
    const location = formData.get("location")?.toString();
    const date = formData.get("date")?.toString();
    const time = formData.get("time")?.toString();
    const mode = formData.get("mode")?.toString();
    const audience = formData.get("audience")?.toString();
    const organizer = formData.get("organizer")?.toString();

    // Get tags
    const tagsValue = formData.get("tags")?.toString();

    const tags: string[] = tagsValue
      ? JSON.parse(tagsValue)
      : [];

    // Get agenda
    const agendaValue = formData.get("agenda")?.toString();

    const agenda: string[] = agendaValue
      ? JSON.parse(agendaValue)
      : [];

    // Update data
    const updateData: {
      title?: string;
      description?: string;
      overview?: string;
      venue?: string;
      location?: string;
      date?: string;
      time?: string;
      mode?: string;
      audience?: string;
      organizer?: string;
      tags?: string[];
      agenda?: string[];
      image?: string;
    } = {
      title,
      description,
      overview,
      venue,
      location,
      date,
      time,
      mode,
      audience,
      organizer,
      tags,
      agenda,
    };

    // Get image
    const file = formData.get("image");

    // Only upload if user selected a new image
    if (file instanceof File && file.size > 0) {
      try {
        const uploadResult = await uploadImage(file);

        updateData.image = uploadResult.secure_url;
      } catch (error) {
        return NextResponse.json(
          {
            message:
              error instanceof Error
                ? error.message
                : "Image upload failed",
          },
          { status: 400 }
        );
      }
    }

    // Update event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Event updated successfully",
        event: updatedEvent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);

    return NextResponse.json(
      {
        message: "Error updating event",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid event ID" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Delete event
    const deletedEvent = await Event.findByIdAndDelete(id);

    // Event doesn't exist
    if (!deletedEvent) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Success
    return NextResponse.json(
      {
        message: "Event deleted successfully",
        eventId: id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);

    return NextResponse.json(
      {
        message: "Error deleting event",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}