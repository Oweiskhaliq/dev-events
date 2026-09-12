"use client";
import { IEvent } from '@/database/event.model';
import {useRouter} from 'next/navigation';
import React, { useState } from 'react'




const CreateEvent = ({EditEvent}: {EditEvent?: IEvent}) => {
    const router = useRouter();
   const isEdit = EditEvent !== undefined;
   
    const [formData, setFormData] = useState({
  title: EditEvent?.title || "",
  description: EditEvent?.description || "",
  overview: EditEvent?.overview || "",
  venue: EditEvent?.venue || "",
  location: EditEvent?.location || "",
  date: EditEvent?.date
    ? new Date(EditEvent.date).toISOString().split("T")[0]
    : "",
  time: EditEvent?.time || "",
  mode: EditEvent?.mode || "",
  audience: EditEvent?.audience || "",
  organizer: EditEvent?.organizer || "",
  tags: EditEvent?.tags?.join(", ") || "",
});

const [agenda, setAgenda] = useState<string[]>(
  EditEvent?.agenda || [""]
);

const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAgendaChange = (index: number, value: string) => {
    setAgenda((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addAgendaItem = () => {
    setAgenda((prev) => [...prev, ""]);
  };

  const removeAgendaItem = (index: number) => {
    setAgenda((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const eventData = {
    ...formData,

    date: new Date(formData.date).toISOString(),

    tags: formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),

    agenda: agenda.filter((item) => item.trim() !== ""),
  };

 

  // Create FormData
  const data = new FormData();

  // Append normal fields
  data.append("title", eventData.title);
  data.append("description", eventData.description);
  data.append("overview", eventData.overview);
  data.append("venue", eventData.venue);
  data.append("location", eventData.location);
  data.append("date", eventData.date);
  data.append("time", eventData.time);
  data.append("mode", eventData.mode);
  data.append("audience", eventData.audience);
  data.append("organizer", eventData.organizer);

  // Append tags
  data.append("tags", JSON.stringify(eventData.tags));

  // Append agenda
  data.append("agenda", JSON.stringify(eventData.agenda));

  // Append image separately
  if (image) {
    data.append("image", image);
  }

  // Call API
 try {
     const response = await fetch(isEdit ? `/api/update-event/${EditEvent._id}` : `/api/events`, {
    method: isEdit ? "PUT" : "POST",
    body: data,
  });
  

  const result = await response.json();
  router.push("/dashboard");
 } catch (error) {
    console.log(error);
    
 }
};
  return (
      <div className="bg-dark-100 border-dark-200 card-shadow w-full max-w-[650px] rounded-[6px] border p-6 sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-light-100 text-sm"
              >
                Event Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
               defaultValue={formData?.title || ""}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className="bg-dark-200 text-light-100 placeholder:text-light-200 w-full rounded-[6px] px-4 py-2.5 text-sm outline-none"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-light-100 text-sm"
              >
                Event Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe the event"
                rows={5}
                required
                className="bg-dark-200 text-light-100 placeholder:text-light-200 w-full resize-none rounded-[6px] px-4 py-3 text-sm outline-none"
              />
            </div>

            {/* Overview */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="overview"
                className="text-light-100 text-sm"
              >
                Event Overview
              </label>

              <textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                placeholder="Give a detailed overview of the event"
                rows={5}
                required
                className="bg-dark-200 text-light-100 placeholder:text-light-200 w-full resize-none rounded-[6px] px-4 py-3 text-sm outline-none"
              />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-light-100 text-sm"
              >
                Event Date
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="bg-dark-200 text-light-100 w-full rounded-[6px] px-4 py-2.5 text-sm outline-none"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="time"
                className="text-light-100 text-sm"
              >
                Event Time
              </label>

              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="bg-dark-200 text-light-100 w-full rounded-[6px] px-4 py-2.5 text-sm outline-none"
              />
            </div>

            {/* Venue */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="venue"
                className="text-light-100 text-sm"
              >
                Event Venue
              </label>

              <input
                id="venue"
                name="venue"
                type="text"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter event venue"
                required
                className="bg-dark-200 text-light-100 placeholder:text-light-200 w-full rounded-[6px] px-4 py-2.5 text-sm outline-none"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="location"
                className="text-light-100 text-sm"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA"
                required
                className="bg-dark-200 text-light-100 placeholder:text-light-200 w-full rounded-[6px] px-4 py-2.5 text-sm outline-none"
              />
            </div>

            {/* Mode */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="mode"
                className="text-light-100 text-sm"
              >
                Event Mode
              </label>

              <select
                id="mode"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                required
                className="bg-dark-200 text-light-100 w-full rounded-[6px] px-4 py-2.5 text-sm outline-none"
              >
                <option value="">Select event mode</option>
                <option value="In-Person">In-Person</option>
                <option value="Online">Online</option>
                <option value="Hybrid (In-Person & Online)">
                  Hybrid (In-Person & Online)
                </option>
              </select>
            </div>

            {/* Audience */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="audience"
                className="text-light-100 text-sm"
              >
                Audience
              </label>

              <input
                id="audience"
                name="audience"
                type="text"
                value={formData.audience}
                onChange={handleChange}
                placeholder="e.g. Developers, engineers, students"
                required
                className="bg-dark-200 text-light-100 placeholder:text-light-200 w-full rounded-[6px] px-4 py-2.5 text-sm outline-none"
              />
            </div>

            {/* Image */}
           <div className="flex flex-col gap-2">
              <label
                htmlFor="image"
                className="text-light-100 text-sm"
              >
              Event Image / Banner
            </label>
 
            <label
            htmlFor="image"
            className="bg-dark-200 text-light-100 flex w-full cursor-pointer items-center justify-center rounded-[6px] px-4 py-3 text-sm"
            >
    {/* 🚀 FIXED LOGIC FOR EDIT MODE DISPLAY */}
    {image 
      ? image.name 
      : EditEvent?.image 
        ? "📄 View/Change current banner" 
        : "↑ Upload event image or banner"
    }

    <input
      id="image"
      name="image"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          setImage(file);
        }
      }}
    />
  </label>

  {/* 💡 OPTIONAL PRO-TIP: Show a small live image preview if an image exists */}
  {(image || EditEvent?.image) && (
    <div className="mt-2 text-xs text-light-300">
      <p>Selected Banner:</p>
      <img 
        src={image ? URL.createObjectURL(image) : EditEvent?.image} 
        alt="Preview" 
        className="mt-1 h-20 w-auto rounded border border-dark-300 object-cover"
      />
    </div>
  )}
            </div>


            {/* Agenda */}
            <div className="flex flex-col gap-3">
              <label className="text-light-100 text-sm">
                Event Agenda
              </label>

              {agenda.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleAgendaChange(index, e.target.value)
                    }
                    placeholder={`Agenda item ${index + 1}`}
                    className="bg-dark-200 text-light-100 placeholder:text-light-200 w-full rounded-[6px] px-4 py-2.5 text-sm outline-none"
                  />

                  {agenda.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAgendaItem(index)}
                      className="text-red-400 px-2 cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addAgendaItem}
                className="text-primary cursor-pointer self-start text-sm"
              >
                + Add agenda item
              </button>
            </div>

            {/* Organizer */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="organizer"
                className="text-light-100 text-sm"
              >
                Organizer
              </label>

              <textarea
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="Enter organizer information"
                rows={4}
                required
                className="bg-dark-200 text-light-100 placeholder:text-light-200 w-full resize-none rounded-[6px] px-4 py-3 text-sm outline-none"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="tags"
                className="text-light-100 text-sm"
              >
                Tags
              </label>

              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. Cloud, DevOps, Kubernetes, AI"
                className="bg-dark-200 text-light-100 placeholder:text-light-200 w-full rounded-[6px] px-4 py-2.5 text-sm outline-none"
              />

              <p className="text-light-200 text-xs">
                Separate tags with commas.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 mt-2 w-full cursor-pointer rounded-[6px] px-4 py-2.5 text-sm font-semibold text-black transition"
            >
             { isEdit ? "Update Event" : "Save Event"}
            </button>
          </form>
        </div>
  )
}

export default CreateEvent