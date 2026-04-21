"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

const ExploreBtn = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href) {
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group w-full sm:w-auto">
      {/* 1. The "Pulse" Glow Effect (Hidden by default, glows on hover) */}
      <div className="absolute inset-0 bg-sky-500 blur-2xl rounded-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
      
      <Link
        href="/Event"
        className="relative z-10 flex items-center justify-center gap-3 bg-sky-500 text-slate-950 font-black text-lg px-10 py-5 rounded-[1.5rem] w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-xl"
      >
        <span className="tracking-tighter uppercase italic">Explore Pulse</span>
        
        {/* Animated Arrow */}
        <div className="relative flex items-center overflow-hidden">
          <HiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          
          {/* Subtle Shine Reflection */}
          <div className="absolute inset-0 w-full h-full bg-linear-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </Link>

      {/* 2. Professional Border Glow (Micro-detail) */}
      <div className="absolute inset-0 rounded-[1.5rem] border border-white/20 pointer-events-none group-hover:border-sky-400/50 transition-colors" />
    </div>
  );
};

export default ExploreBtn;