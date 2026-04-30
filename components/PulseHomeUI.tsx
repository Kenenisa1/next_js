"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import HeroSection from "@/components/HeroSection"; 
import { IEvent } from "@/database";
import LoadingSpinner from "@/components/LoadingSpinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const;

const PulseHomeUI = ({ events }: { events: IEvent[] }) => {
  const hasEvents = Array.isArray(events) && events.length > 0;
  const featuredEvents = hasEvents ? events.slice(0, 3) : [];
  
  const isLoading = events === undefined || events === null;

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-violet-500/30 overflow-x-hidden">
      
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] bg-violet-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <HeroSection />

      <section id="events" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.4em] mb-2">
              የቅርብ ጊዜ ኩነቶች (The Latest Pulse)
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
              ተለይተው የቀረቡ <span className="text-violet-500">ዝግጅቶች</span>
            </h2>
          </motion.div>

          <Link href="/events">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="text-[12px] font-black text-zinc-400 hover:text-white transition-all bg-white/5 px-6 py-3 rounded-full border border-white/10 uppercase tracking-widest"
            >
              ሁሉንም ይመልከቱ →
            </motion.button>
          </Link>
        </div>

        {/* The Grid Logic */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {hasEvents ? (
            featuredEvents.map((event: IEvent, index: number) => (
              <motion.div 
                key={event._id?.toString() || `event-${index}`} 
                variants={itemVariants}
                className="group"
              >
                <div className="relative transform group-hover:-translate-y-3 transition-all duration-500 ease-[0.16, 1, 0.3, 1]">
                  <div className="absolute inset-0 bg-violet-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]" />
                  <div className="relative">
                    <EventCard {...event} />
                  </div>
                </div>
              </motion.div>
            ))
          ) : isLoading ? (
            <div className="col-span-full py-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[40px] bg-white/[0.01]">
               <LoadingSpinner />
               <p className="mt-4 text-[12px] font-black text-zinc-600 uppercase tracking-widest animate-pulse">
                 መረጃዎች በመጫን ላይ ናቸው... (Synchronizing)
               </p>
            </div>
          ) : (
            <div className="col-span-full py-32 text-center border border-dashed border-white/5 rounded-[40px] bg-white/[0.01]">
               <p className="text-zinc-500 font-black uppercase tracking-[0.3em] italic text-sm">
                 ምንም የተገኙ ዝግጅቶች የሉም። (Pulse is quiet)
               </p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default PulseHomeUI;