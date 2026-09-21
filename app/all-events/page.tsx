import EventCard from '@/components/EventCard'
import Pagination from '@/components/Pagination'
import { getEvents } from '@/lib/action/event.action'
export const instant = false;
const AllEvents = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) => {
  const params = await searchParams

  const currentPage = Number(params.page) || 1
  const pageSize = 10

  const { events, totalPages } = await getEvents(
    currentPage,
    pageSize
  )

  return (
    <div className="mt-20 space-y-7">
      <h3>Events</h3>

      <ul className="events">
        {events.length > 0 &&
          events.map((event) => (
            <li className="list-none" key={event._id}>
              <EventCard {...event} />
            </li>
          ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/all-events"
      />
    </div>
  )
}

export default AllEvents