


import CreateEventForm from "@/components/CreateEvent";
export const instant = false; 
const CreateEvent = () => {

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