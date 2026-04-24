import EventForm from "@/components/admin/EventForm";

export default function CreateEventPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">
            Initialize <span className="text-sky-500">Pulse</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-4">
            Broadcast a new event to the Hawassa Network
          </p>
        </header>

        {/* Our refined form in 'Create' mode */}
        <EventForm type="Create" />
      </div>
    </main>
  );
}