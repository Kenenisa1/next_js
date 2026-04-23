'use client';
import { FaMapMarkedAlt, FaWalking, FaChevronRight } from 'react-icons/fa';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import Link from 'next/link';
import CountUp from '@/components/CountUp';

const hubData = [
  {
    id: "lake-front",
    name: "Lake Front",
    tagline: "Social & Leisure Core",
    description: "The heartbeat of Hawassa's social life. Home to jazz nights, resort events, and sunset gatherings.",
    activeEvents: 8,
    members: 1200,
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "industrial-park",
    name: "Industrial Park",
    tagline: "Economic Engine",
    description: "Where technology meets manufacturing. Focuses on professional workshops and corporate networking.",
    activeEvents: 3,
    members: 850,
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "university",
    name: "University",
    tagline: "Innovation & Talent",
    description: "Centered around Arba Minch & Hawassa University talents. The core for hackathons and peer learning.",
    activeEvents: 12,
    members: 3400,
    color: "from-purple-500/20 to-pink-500/10",
  },
  // Add Downtown, Millennium, etc.
];

export default function HubsPage() {
  return (
    <main className="min-h-screen bg-[#030014] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-sky-500 font-black uppercase tracking-[0.3em] text-xs mb-4">
            <FaMapMarkedAlt />
            City Architecture
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
            Explore <span className="text-sky-500">Hubs</span>
          </h1>
          <p className="mt-6 text-zinc-500 max-w-xl font-medium text-lg">
            Navigate through Hawassas specialized districts. Each hub is a unique pulse of activity and opportunity.
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubData.map((hub) => (
            <Link key={hub.id} href={`/explore?hub=${hub.name}`} className="group relative">
              <div className={`h-full p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:-translate-y-2 overflow-hidden`}>
                
                {/* Background Glow */}
                <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${hub.color} blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">{hub.name}</h3>
                      <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mt-1">{hub.tagline}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-sky-500 group-hover:text-black transition-colors">
                      <FaChevronRight />
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-12 min-h-[60px]">
                    {hub.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div>
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Live Events</p>
                      <div className="flex items-center gap-2 text-white font-black text-xl">
                        <HiOutlineLightningBolt className="text-sky-500" />
                        <CountUp end={hub.activeEvents} />
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Pulse Members</p>
                      <div className="flex items-center gap-2 text-white font-black text-xl">
                        <FaWalking className="text-zinc-500" size={14} />
                        <CountUp end={hub.members} suffix="+" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}