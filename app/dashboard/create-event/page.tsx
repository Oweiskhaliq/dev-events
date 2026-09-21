


import CreateEventForm from "@/components/CreateEvent";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
export const instant = false; 
const CreateEvent = async () => {
 const user = await getCurrentUser();

  if (!user) {
    redirect("/dashboard/login");
  }
  return (
    <main>
      <section className="w-full flex flex-col items-center">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl">
            Create an Event
          </h1>
        </div>

        {/* Form Card */}
       <CreateEventForm />
      </section>
    </main>
  );
};

export default CreateEvent;