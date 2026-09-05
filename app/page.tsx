import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { getEvents } from "@/lib/action/event.action";
import { cacheLife } from "next/cache";
export const instant = false;

export default async function Home() {
  "use cache"
  cacheLife("hours")
  const events = await getEvents()
  return (
    <section>
      <h1 className="text-center">The Hub for Every Dev <br/>  Event You can&apos;t miss.</h1>
      <p className="text-center mt-5">Hackathons. Meetups,and Conferences All in one Place</p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">

        <h3>Featured Events</h3>

        <ul className="events">
          {events.length > 0 && events.map((event)=>(
            <li  className="list-none" key={event._id}>
              <EventCard {...event}/>
            </li>
          ))}
        </ul>

      </div>
    
    </section>
  );
}
