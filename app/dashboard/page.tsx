
import Link from "next/link";
import { getEvents } from "@/lib/action/event.action";
import EventTable from "@/components/EventTable";
import { connection } from "next/server";
export const instant = false;
interface Event {
  _id: string;
  title: string;
  image: string;
  location: string;
  date: string;
  time: string;
  audience: string;
}




const Dashboard = async ({searchParams,}:{searchParams: Promise<{ page?: string }>;}) => {
  
  const {page} =  await searchParams;
  const currentPage = Math.max(Number(page) || 1);
    
  let ITEMS_PER_PAGE = 10;
    await connection();
    const {events,totalPages} = await getEvents(
      currentPage,
      ITEMS_PER_PAGE
    )
    
  return (
    <main>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-light-200 text-sm mb-2">
              Admin Dashboard
            </p>

            <h1 className="text-4xl! max-sm:text-3xl!">
              Event Management
            </h1>
          </div>

          <Link
            href="/dashboard/create-event"
            className="bg-primary text-dark-100 px-5 py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Add New Event
          </Link>
        </div>

        {/* Table */}
        <EventTable events={events} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
};

export default Dashboard;