"use client";

import ExploreBtn from "./ExploreBtn";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center bg-[#030014]">
      
      {/* 1. The Animated "Aurora" Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        {/* Glow 1: Sky Blue (Top Left) */}
        <div 
          className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] rounded-full bg-linear-to-br from-primary via-primary/30 to-transparent blur-[120px]" 
          style={{
            animation: "aurora 25s ease-in-out infinite",
          }}
        />
        {/* Glow 2: Indigo (Bottom Right) */}
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[80%] h-[80%] rounded-full bg-linear-to-tl from-secondary via-secondary/20 to-transparent blur-[120px]" 
          style={{
            animation: "aurora 30s ease-in-out infinite",
            animationDelay: "-5s",
          }}
        />
      </div>

      {/* 2. Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center rounded-lg border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-10">
          📍 Hawassa City Community Guide
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9] mb-8">
          DIGITAL<br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-indigo-400 to-indigo-500">
            PULSE
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-zinc-300 text-lg md:text-xl font-medium leading-relaxed mb-12">
          Empowering the community by bridging the gap between events, 
          hubs, and people. Save time. Save energy. Grow together.
        </p>

        <div className="relative inline-block w-full max-w-xs transition-transform hover:scale-105 group">
          <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-110 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10">
            <ExploreBtn />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;