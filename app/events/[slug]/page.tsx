import { notFound } from "next/navigation";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { HiOutlineBadgeCheck, HiOutlineInformationCircle } from "react-icons/hi";
import Link from "next/link";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// 1. Metadata fix: Ensure we point to .en to avoid object errors during build
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/events/${slug}`);
  const data = await res.json();
  return { title: `${data.event?.title?.en || 'Event'} | Hawassa Pulse` };
}

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>; }) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`, { next: { revalidate: 3600 } });
  const data = await request.json();

  if (!data.event) return notFound();

  const event: IEvent = data.event;
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  // Helper to safely render strings in Server Components 
  // (Since useLanguage() doesn't work here, we default to 'en' for SSR)
  const getContent = (field: any) => typeof field === 'object' ? field.en : field;

  return (
    <div className="min-h-screen bg-[#030014] text-zinc-100 pb-32 selection:bg-sky-500 selection:text-black">
      
      {/* 1. HERO HEADER */}
      <div className="relative h-[55vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={event.image}
          alt={getContent(event.title)}
          fill
          className="object-cover scale-105 brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/20 to-transparent" />
        
        <div className="absolute top-24 left-0 w-full px-6 flex justify-between items-center z-20">
          <Link href="/Event" className="group p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:border-sky-500/50 transition-all">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <button className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:border-sky-500/50 transition-all">
            <FaShareAlt />
          </button>
        </div>

        <div className="absolute bottom-12 left-0 w-full px-8 max-w-7xl mx-auto">
          <div className="space-y-4">
             <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
               {event.hub || "Central Pulse"}
             </span>
             <h1 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
               {getContent(event.title)}
             </h1>
             <p className="hidden md:block text-zinc-400 text-lg font-medium max-w-2xl border-l-2 border-sky-500 pl-6 py-2">
               {getContent(event.description)}
             </p>
          </div>
        </div>
      </div>

      {/* 2. CORE UTILITY GRID */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-[-40px] relative z-10">
        <div className="lg:col-span-8 space-y-20">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-1 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl">
            {[
              { icon: <FaCalendarAlt />, label: "Timeline", value: event.date },
              { icon: <FaClock />, label: "Beat", value: event.time },
              { icon: <FaMapMarkerAlt />, label: "Hub", value: getContent(event.location) },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 p-6 bg-black/40 rounded-[2rem] border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500 text-xl">{item.icon}</div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest">{item.label}</p>
                  <p className="text-sm font-bold text-white uppercase italic">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-px flex-1 bg-white/10" />
               <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-3">
                 <HiOutlineInformationCircle className="text-sky-500" /> The Insight
               </h2>
               <div className="h-px flex-1 bg-white/10" />
            </div>
            <p className="text-zinc-400 leading-relaxed text-lg font-medium whitespace-pre-line px-4">
              {getContent(event.overview)}
            </p>
          </section>

          {/* Event Flow */}
          <section className="relative overflow-hidden bg-slate-950/40 border border-white/5 rounded-[3rem] p-10">
            <h2 className="text-2xl font-black text-white uppercase italic mb-12 tracking-widest">Pulse Sequence</h2>
            <div className="space-y-10 relative">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-sky-500/50 via-sky-500/20 to-transparent" />
              {event.agenda.map((item, index) => (
                <div key={index} className="flex gap-10 items-start relative group">
                  <div className="w-6 h-6 rounded-full bg-black border-2 border-sky-500 z-10 group-hover:scale-125 transition-transform" />
                  <div className="space-y-1">
                    <span className="text-sky-500/60 font-black text-[10px] uppercase tracking-widest">Phase 0{index + 1}</span>
                    <p className="text-zinc-300 font-bold text-xl leading-snug group-hover:text-white transition-colors uppercase italic tracking-tighter">
                      {getContent(item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-32 space-y-6">
            <div className="bg-zinc-950/80 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 text-sky-400 mb-8 bg-sky-500/5 w-fit px-4 py-1.5 rounded-full border border-sky-500/10">
                <HiOutlineBadgeCheck className="text-lg" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Hub Event</span>
              </div>
              <h2 className="text-4xl font-black text-white uppercase italic mb-2 tracking-tighter">Join the Grid</h2>
              <BookEvent eventId={event._id.toString()} slug={event.slug} />
            </div>
          </div>
        </aside>
      </main>

      {/* MOBILE BOTTOM BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 lg:hidden z-50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between gap-4">
          <div className="pl-4">
            <p className="text-[9px] uppercase font-black text-zinc-500 tracking-widest">Entry Fee</p>
            <p className="text-white font-black italic uppercase text-lg leading-tight">Secure Pass</p>
          </div>
          <div className="w-1/2">
             <BookEvent eventId={event._id.toString()} slug={event.slug} />
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-12">Extend the Pulse</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarEvents.slice(0, 3).map((e: IEvent) => (
            <EventCard key={e.slug} {...e} title={e.title} location={e.location} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventDetailsPage;