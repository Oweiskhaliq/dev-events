"use client";
import { IEvent } from '@/database/event.model'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EventTable = ({events}: { events: IEvent[] }) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this event?"
  );

  if (!confirmed) return router.push("/dashboard");

  try {
    const response = await fetch(`/api/update-event/${id}`, {
      method: "DELETE",
    });
    console.log("response",response)

    const data = await response.json();
    console.log("delete",data)

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete event");
    }

    console.log(data.message);
   // Refresh the Server Component
     router.push("/dashboard");
      
      
    
  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
};
  return (
    
        <div className="glass rounded-xl overflow-hidden border border-border-dark">
          <div className="overflow-x-auto">
            <table className="w-full min-w-245">
              <thead>
                <tr className="border-b border-border-dark bg-dark-100/60">
                  <th className="text-left px-5 py-4 text-sm font-medium">
                    Event
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-medium">
                    Location
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-medium">
                    Date
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-medium">
                    Time
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-medium">
                    Audience
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {events.map((event,index) => (
                  <tr
                    key={index}
                    className="border-b border-border-dark last:border-b-0 hover:bg-dark-100/40 transition"
                  >
                    {/* Event */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-10 h-10 rounded-md object-cover"
                        />

                        <span className="font-medium whitespace-nowrap">
                          {event.title}
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4 text-sm text-light-200">
                      {event.location}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm text-light-200 whitespace-nowrap">
                      {event.date}
                    </td>

                    {/* Time */}
                    <td className="px-5 py-4 text-sm text-light-200 whitespace-nowrap">
                      {event.time}
                    </td>

                    {/* Audience */}
                    <td className="px-5 py-4 text-sm text-light-200">
                      {event.audience}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="text-primary text-sm hover:underline"
                        >
                          <Link href={`/dashboard/edit-event/${event._id}`}>Edit</Link>
                          
                        </button>

                        <button
                          type="button"
                          className="text-red-400 text-sm hover:underline"
                          onClick={() => handleDelete(event._id.toString())}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-border-dark">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-dark-100 text-sm hover:bg-dark-200 transition"
            >
              Previous
            </button>

            <span className="text-sm text-light-200">
              Page 1 of 10
            </span>

            <button
              type="button"
              className="px-4 py-2 rounded-md bg-dark-100 text-sm hover:bg-dark-200 transition"
            >
              Next
            </button>
          </div>
        </div>
  )
}

export default EventTable