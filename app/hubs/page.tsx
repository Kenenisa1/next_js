import { FaMapMarkedAlt, FaWalking, FaChevronRight } from 'react-icons/fa';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import Link from 'next/link';
import CountUp from '@/components/CountUp';
import LText from '@/components/LanguageFriendlyText';
import  connectToDatabase  from "@/lib/mongodb";
import Event from "@/database/event.model";


async function getHubsData() {
  try {
    await connectToDatabase();
    const distinctHubs = await Event.distinct("hub");
    const hubs = await Promise.all(distinctHubs.map(async (hubName) => {
      const activeCount = await Event.countDocuments({ hub: hubName });
      
      // Map your existing hub strings to rich UI data
      return {
        name: hubName, // Assuming 'hub' in Event is a string or localized object
        tagline: { en: "Active Pulse Core", am: "ንቁ የማዕከል እምብርት" },
        description: { 
          en: `Explore the latest activities and opportunities within the ${hubName} district.`,
          am: `በ${hubName} ውስጥ ያሉ የቅርብ ጊዜ እንቅስቃሴዎችን እና እድሎችን ያስሱ።`
        },
        slug: typeof hubName === 'string' ? hubName.toLowerCase().replace(/ /g, '-') : 'hub',
        colorHex: hubName.includes('Lake') ? '#0ea5e9' : '#8b5cf6',
        activeEvents: activeCount,
        members: Math.floor(Math.random() * 500) + 100 // Placeholder until Hub model is added
      };
    }));

    return JSON.parse(JSON.stringify(hubs));
  } catch (error) {
    console.error("Hubs Data Fetch Error:", error);
    return [];
  }
}

export default async function HubsPage() {
  const hubs = await getHubsData();

  return (
    <main className="min-h-screen bg-[#030014] pt-32 pb-20 px-6 selection:bg-sky-500/30">
      <div className="max-w-7xl mx-auto">        
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 text-sky-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6">
            <div className="w-8 h-[2px] bg-sky-500" />
            <FaMapMarkedAlt />
            City Architecture
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            Explore <span className="text-sky-500 text-glow">Hubs</span>
          </h1>
          <p className="mt-8 text-zinc-500 max-w-2xl font-medium text-xl leading-relaxed border-l border-white/10 pl-8">
            Navigate through Hawassas specialized districts. Each hub is a unique pulse of activity and talent integration.
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hubs.map((hub, index) => (
            <Link key={index} href={`/explore?hub=${hub.slug}`} className="group relative">
              <div className="h-full p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl transition-all duration-700 group-hover:border-sky-500/30 group-hover:-translate-y-4 overflow-hidden shadow-2xl">
                
                {/* Visual Glow */}
                <div 
                  className="absolute -right-20 -top-20 w-64 h-64 blur-[80px] rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-700" 
                  style={{ backgroundColor: hub.colorHex }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-16">
                    <div>
                      <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">
                        <LText content={hub.name} />
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-sky-500" />
                        <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest">
                          <LText content={hub.tagline} />
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 group-hover:bg-sky-500 group-hover:text-black transition-all duration-500">
                      <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <p className="text-zinc-400 text-base leading-relaxed mb-16 min-h-[80px] font-medium italic">
                    <LText content={hub.description} />
                  </p>

                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">Live Pulse</p>
                      <div className="flex items-center gap-3 text-white font-black text-2xl">
                        <div className="p-2 rounded-lg bg-sky-500/10">
                           <HiOutlineLightningBolt className="text-sky-500 animate-pulse" />
                        </div>
                        <CountUp end={hub.activeEvents} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">Network</p>
                      <div className="flex items-center gap-3 text-white font-black text-2xl">
                        <div className="p-2 rounded-lg bg-white/5">
                           <FaWalking className="text-zinc-500" size={16} />
                        </div>
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