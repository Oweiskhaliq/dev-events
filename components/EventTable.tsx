"use client";
import { IEvent } from '@/database/event.model'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Pagination from './Pagination';
import { useState } from 'react';
import DeleteDialogBox from './DeleteDialogBox';

const EventTable = ({events,currentPage,totalPages}: { events: IEvent[],currentPage: number,totalPages: number }) => {
  const router = useRouter();
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
const [isDeleting, setIsDeleting] = useState(false);
const handleDelete = async (id: string) => {
  try {
    setIsDeleting(true);

    const response = await fetch(`/api/update-event/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete event");
    }

    setDeleteEventId(null);
    router.refresh();
  } catch (error) {
    console.error("DELETE ERROR:", error);
  } finally {
    setIsDeleting(false);
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
                          onClick={() => setDeleteEventId(event._id.toString())}
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
             {/* Delete Dialog Box */}
          <DeleteDialogBox
          isOpen={deleteEventId !== null}
          isDeleting={isDeleting}
          onClose={() => setDeleteEventId(null)}
          onConfirm={() => {
            if (deleteEventId) {
              handleDelete(deleteEventId);
            }
          }}
        />

          {/* Pagination */}
          <Pagination  currentPage={currentPage} totalPages={totalPages} basePath="/dashboard"  />
              
           

        </div>
  )
}

export default EventTable