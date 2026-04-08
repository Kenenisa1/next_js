import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const Page = async () => {
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();
  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden selection:bg-indigo-200 selection:text-indigo-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),transparent_20%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.12),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.14),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),transparent_20%)]" />

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 px-6">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-96 -translate-y-1/2">
          <div className="mx-auto h-full w-full max-w-4xl rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.18),transparent_32%)] blur-3xl" />
          <div className="mx-auto h-full w-full max-w-3xl rounded-full bg-[radial-gradient(circle,_rgba(96,165,250,0.12),transparent_40%)] blur-2xl" />
        </div>
        <main className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            The Hub For Every Dev
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
              Event You Can&apos;t Miss
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-zinc-300 max-w-2xl leading-8">
            Discover hackathons, local meetups, and global conferences. Connect
            with the community and level up your stack with a polished,
            OLED-ready experience.
          </p>

          <div className="mt-10 w-full max-w-xs">
            <ExploreBtn />
          </div>
        </main>
      </section>

      {/* Events Section */}
      <section id="events" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Events</h2>
            <p className="text-zinc-400 mt-1">
              Hand-picked opportunities for you
            </p>
          </div>

          <button className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 transition hover:border-indigo-400/30 hover:bg-white/10">
            View all →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <EventCard key={event.title} {...event} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
