"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { HiSearch, HiFilter } from "react-icons/hi";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";

const hubs = [
  "All",
  "Industrial Park",
  "Lake Front",
  "Millennium",
  "University",
  "Downtown",
];

const ExplorePage = () => {
  const searchParams = useSearchParams();
  const urlHub = searchParams.get("hub");

  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeHub, setActiveHub] = useState(urlHub || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event: IEvent) => {
    const matchesHub = activeHub === "All" || event.hub === activeHub;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHub && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#030014] pt-24 md:pt-32 pb-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Background Decorative Glow (Mobile-Sized) */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* 1. Header & Search - Stacked on Mobile, Row on Desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 md:mb-16">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
              Explore <span className="text-sky-500">Hawassa</span>
            </h1>
            <p className="text-zinc-500 font-bold mt-3 text-sm md:text-base tracking-tight uppercase">
              Find the pulse of the city in real-time.
            </p>
          </div>

          <div className="relative group w-full lg:max-w-md">
            <HiSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-sky-500 transition-colors"
              size={22}
            />
            <input
              type="text"
              placeholder="Search events, workshops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] md:rounded-2xl py-4 md:py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all placeholder:text-zinc-600 text-sm font-medium"
            />
          </div>
        </div>

        {/* 2. Hub Filter - Dropup on Mobile, Row on Desktop */}
        {/* 2. Hub Filter - Responsive Logic */}
        <div className="relative mb-12">
          {/* MOBILE/TABLET VIEW: Trigger + Bottom Sheet */}
          <div className="lg:hidden">
            {/* The Static Trigger Button (Remains in place) */}
            <button
              onClick={() => setIsOpen(true)}
              className="w-full flex items-center justify-between bg-white/[0.03] border border-white/10 p-5 rounded-[1.5rem] text-white active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500">
                  <HiFilter size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                    Filter Hub
                  </p>
                  <p className="text-sm font-black uppercase italic tracking-tight text-white">
                    {activeHub}
                  </p>
                </div>
              </div>
              <div className="text-zinc-500">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {/* The Dropup Menu - Using a Portal-like Fixed Overlay */}
            {isOpen && (
              <div className="fixed inset-0 z-[100] flex flex-col justify-end">
                {/* Semi-transparent Backdrop */}
                <div
                  className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                  onClick={() => setIsOpen(false)}
                />

                {/* The Actual Bottom Sheet */}
                <div className="relative bg-[#07070f] border-t border-white/10 rounded-t-[2.5rem] p-8 pb-12 animate-in slide-in-from-bottom duration-500 ease-out shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                  {/* Visual Indicator/Drag Handle */}
                  <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-10" />

                  <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                      Select Hub
                    </h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-zinc-500 hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {hubs.map((hub) => (
                      <button
                        key={hub}
                        onClick={() => {
                          setActiveHub(hub);
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                          activeHub === hub
                            ? "bg-sky-500 border-sky-400 text-slate-950 font-black shadow-[0_0_30px_rgba(14,165,233,0.2)] scale-[1.02]"
                            : "bg-white/[0.03] border-white/5 text-zinc-400 font-bold hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className="uppercase tracking-widest text-xs italic">
                          {hub}
                        </span>
                        {activeHub === hub && (
                          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-inner" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP VIEW: Standard Horizontal Bar (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex shrink-0 items-center justify-center p-3.5 rounded-2xl bg-white/5 border border-white/10 text-sky-500">
              <HiFilter size={20} />
            </div>
            {hubs.map((hub) => (
              <button
                key={hub}
                onClick={() => setActiveHub(hub)}
                className={`whitespace-nowrap px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeHub === hub
                    ? "bg-sky-500 text-slate-950 shadow-[0_0_25px_rgba(14,165,233,0.3)] scale-105 italic"
                    : "bg-white/[0.02] border border-white/5 text-zinc-500 hover:text-white hover:border-white/20"
                }`}
              >
                {hub}
              </button>
            ))}
          </div>
        </div>
        {/* 3. Events Grid - Adaptive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white/5 border border-white/5 rounded-[2.5rem] aspect-[4/5] md:h-[500px]"
              />
            ))
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event: IEvent) => (
              <div
                key={event.slug}
                className="group transition-transform duration-500 hover:-translate-y-2"
              >
                <EventCard
                  title={event.title}
                  image={event.image}
                  slug={event.slug}
                  location={event.location}
                  date={event.date}
                  time={event.time}
                  hub={event.hub}
                />
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="col-span-full py-20 md:py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] px-6">
              <div className="inline-flex p-6 bg-white/5 rounded-full mb-6 text-zinc-800">
                <HiSearch size={48} />
              </div>
              <h3 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tighter">
                The pulse is quiet here...
              </h3>
              <p className="text-zinc-500 mt-3 mb-10 max-w-sm mx-auto font-medium">
                Try a different hub or search for something else in the city.
              </p>
              <button
                onClick={() => {
                  setActiveHub("All");
                  setSearchQuery("");
                }}
                className="px-10 py-4 bg-sky-500 text-slate-950 font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-sky-400 active:scale-95 transition-all shadow-xl shadow-sky-500/20"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ExplorePage;
