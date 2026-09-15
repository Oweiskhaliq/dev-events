import React from 'react'
import { GetSingleEvent } from '@/lib/action/updateEvent.action';

import CreateEventForm from '@/components/CreateEvent';
import { notFound } from 'next/navigation';

export const instant = false; 
const EditEvent = async ({ params }: { params: Promise<{ id: string }> }) => {
    let eventResult
    let eventToEdit
   try {
    const {id} = await params;
    eventResult = await GetSingleEvent(id)

    if (!eventResult || !eventResult.success || !eventResult.data) {
      notFound(); // Redirects to a 404 page if event isn't found
  }
     eventToEdit = eventResult.data;

   
   } catch (error) {
    console.error("Error fetching event:", error);
    
   }
  
// const plainEvent = eventResult.event ? JSON.parse(JSON.stringify(eventResult.event)) : null;
  return (
    <main>
      <section className="w-full flex flex-col items-center">
       
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl">
            Edit an Event 

          </h1>
        </div>

        {/* Form Card */}
       <CreateEventForm EditEvent={eventToEdit} />
      </section>
    </main>
  )
}

export default EditEvent
