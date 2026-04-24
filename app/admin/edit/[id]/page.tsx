import EventForm from "@/components/admin/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditEventPage = async ({ params }: Props) => {
  // Await the params in Next.js 15+
  const { id } = await params; 
  
  const event = await getEventById(id);

  if (!event) {
    return notFound(); // Triggers the default Next.js 404 page
  }

  return (
    <main className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">
            Edit Pulse
          </h1>
          <div className="h-1 w-20 bg-sky-500 mt-4 rounded-full" />
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-6">
            Database Entry: <span className="text-sky-500">{id}</span>
          </p>
        </header>

        {/* The refined form we just built */}
        <EventForm initialData={event} type="Update" />
      </div>
    </main>
  );
};

export default EditEventPage;