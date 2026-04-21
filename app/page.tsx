import EventCard from "@/components/EventCard";
import HeroSection from "@/components/HeroSection";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const Page = async () => {
  "use cache";
  cacheLife("hours");
  
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-violet-500/30">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-violet-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-indigo-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Events Section */}
      <section id="events" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-white">Upcoming Events</h2>
            <div className="h-1.5 w-20 bg-violet-500 rounded-full mt-3" />
          </div>
          <button className="text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors">
            SEE ALL EVENTS →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events && events.length > 0 ? (
            events.map((event: IEvent) => (
              <div key={event.title} className="hover:-translate-y-2 transition-transform duration-300">
                <EventCard {...event} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
               <p className="text-zinc-500">No upcoming hackathons found. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;