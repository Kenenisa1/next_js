import { FaHeartbeat, FaMapMarkedAlt, FaCity, FaChartLine } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import CountUp from "@/components/CountUp";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030014] text-slate-300 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* 1. The Pulse Hero */}
        <section className="text-center mb-24 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-black uppercase tracking-[0.3em] mb-8">
            <FaHeartbeat className="animate-pulse" />
            Live from the Southern Capital
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
            Hawassa <span className="text-sky-500">Pulse</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-medium">
            We are the digital heartbeat of Hawassa. Our mission is to connect the city’s residents, visitors, and businesses through a <span className="text-white font-bold">real-time ecosystem</span> of events, hubs, and opportunities.
          </p>
        </section>

        {/* 2. The City-Scale Impact */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
  {[
    { label: "Active Users", value: 2400, suffix: "+" },
    { label: "City Hubs", value: 6, suffix: "" },
    { label: "Daily Events", value: 15, suffix: "+" },
    { label: "Local Partners", value: 45, suffix: "" }
  ].map((stat, i) => (
    <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center hover:border-sky-500/30 transition-all">
      <h3 className="text-4xl font-black text-white mb-2 italic uppercase">
        <CountUp end={stat.value} suffix={stat.suffix} />
      </h3>
      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{stat.label}</p>
    </div>
  ))}
</div>

        {/* 3. Our Core Pillars (City-Focused) */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="p-10 rounded-[3rem] bg-[#07070f] border border-white/5">
            <FaMapMarkedAlt className="text-3xl text-sky-500 mb-6" />
            <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Hub Discovery</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              From the Industrial Park to the Lake Front, we map the city’s key zones so you always know where the action is.
            </p>
          </div>

          <div className="p-10 rounded-[3rem] bg-[#07070f] border border-white/5">
            <FaCity className="text-3xl text-sky-500 mb-6" />
            <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Urban Pulse</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Real-time updates on workshops, jazz nights, and community gatherings. If it is happening in Hawassa, it is on the Pulse.
            </p>
          </div>

          <div className="p-10 rounded-[3rem] bg-[#07070f] border border-white/5">
            <FaChartLine className="text-3xl text-sky-500 mb-6" />
            <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Economic Growth</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering local businesses by giving them a high-end digital stage to reach the modern Hawassa audience.
            </p>
          </div>
        </div>

        {/* 4. The Vision (Hawassa 2026) */}
        <section className="relative rounded-[4rem] bg-linear-to-br from-sky-500 to-indigo-600 p-12 md:p-20 overflow-hidden text-white">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8">
              Digitizing the <br /> 
              Lake City.
            </h2>
            <p className="text-lg font-bold mb-10 opacity-90">
              Hawassa Pulse is more than an app; it’s a commitment to making our city the most digitally connected hub in Ethiopia. We use the MERN stack to deliver speed, and our hearts to deliver community.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-colors">
                Explore the Map
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
                Partner With Us
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}