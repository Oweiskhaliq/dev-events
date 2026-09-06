export const instant = false;
import { notFound } from 'next/navigation'
import Image from 'next/image'
import BookEvent from '@/components/BookEvent'
import { getSimilarEventsBySlug } from '@/lib/action/event.action'
import { IEvent } from '@/database/event.model'
import EventCard from '@/components/EventCard'


const EventDetailItems = ({icon,alt,label}:{icon:string,alt:string,label:string}) =>{
  return(
    <div className='flex-row-gap-2'>
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  )
}

const EventAgenda = ({agenda}:{agenda:string[]}) =>{
  return(
    <div className='agenda'>
      <h2>Agenda</h2>
      <ul>
        {agenda.map((item,index)=>(
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const EventTags =({tags}:{tags:string[]}) =>{
  return(
      <div className='flex flex-row gap-1.5 flex-wrap'>
        {tags.map((tag,index)=>(
          <div  className="pill" key={index}>{tag}</div>
        ))}
      </div>
  )
}
const EventDetailPage = async ({params}:{params:Promise<{slug:string}>}) => {
  const {slug} = await params
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`)
  const {event:{_id,description,image,location,date,time, agenda,overview,audience,tags,organizer}} = await response.json()
console.log("id", _id,"slug",slug)
  if(!description) return notFound()

  const booking = 10

  const similarEvents = await getSimilarEventsBySlug(slug)
  

  return (
    <section id="event">
     <div className='header'>
       <h1>Event Dscription</h1>
       <p >{description}</p>
     </div>

     <div className='details'>
      {/* left side event content   */}
      <div className='content'>
        <Image src={image} alt="Event Banner" width={800} height={800} className='banner'/>
     
      {/* overview section  */}
      <section className='flex-col-gap-2'>
        <h2>Event Overview</h2>
        <p>{overview}</p>
      </section>
{/* event detail section  */}
      <section className='flex-col-gap-2'>
        <h2>Event Details</h2>
        <EventDetailItems icon="/icons/calendar.svg" alt="calendar" label={date} />
        <EventDetailItems icon="/icons/clock.svg" alt="time" label={time} />
         <EventDetailItems icon="/icons/pin.svg" alt="location" label={location} />
         <EventDetailItems icon="/icons/audience.svg" alt="audience" label={audience} />
        
      </section>
      {/* agenda section  */}
      <EventAgenda agenda={agenda} />

      {/* organizer section  */}
      <section className='flex-col-gap-2'>
        <h2>About The Organizer</h2>
        <p>{organizer}</p>
      </section>
      {/* tags section  */}
      <EventTags tags={tags}  />

     </div>

      {/* right side booking form  */}
      <aside className='booking'>
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {booking  > 0 ? (
              <p className='text-sm'>
                Join {booking} people who are already booked there spot!
              </p>
            ):(
              <p className='text-sm'>
                Be the first to Book your spot!
              </p>
            )
          }
          <BookEvent eventId={_id} slug={slug} />
            </div>
      </aside>
     </div>

     
      {/* similar Event section  */}
      <div className='flex w-full flex-col gap-4 mt-20'>
        <h2>Similar Events</h2>
        <div className='events'>
          {similarEvents.length > 0 && similarEvents.map((similarEvent)=>(
            <EventCard key={similarEvent.title} {...similarEvent} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventDetailPage