'use client'; // Changed to client for dynamic date and interactive hover effects

import Link from 'next/link';
import { FaTelegramPlane, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { HiOutlineLightningBolt } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="relative bg-[#030014] border-t border-white/5 overflow-hidden">
      
      {/* 1. TOP GLOW LINE - Represents the Pulse */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* BRAND COLUMN (Span 4) */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                Hawassa<span className="text-sky-500">Pulse</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-medium">
              Saving energy and time for the Hawassa community. The central source 
              for city events, industrial hubs, and community gatherings.
            </p>
            
            {/* Social Pulse */}
            <div className="flex gap-3">
              {[
                { icon: <FaTelegramPlane />, href: "#" },
                { icon: <FaLinkedinIn />, href: "#" },
                { icon: <FaFacebookF />, href: "#" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Discover</h3>
            <ul className="space-y-4">
              {['City Events', 'Event Hubs', 'City Map'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-tighter">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ORGANIZATION (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Organization</h3>
            <ul className="space-y-4">
              {['Our Vision', 'Partner With Us', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().split(' ')[0]}`} className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-tighter">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER (Span 4) */}
          <div className="md:col-span-4">
            <div className="p-6 md:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
              {/* Internal decorative glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] rounded-full translate-x-10 -translate-y-10" />
              
              <h3 className="text-white font-black italic uppercase tracking-tighter text-xl mb-2 flex items-center gap-2">
                <HiOutlineLightningBolt className="text-sky-500" /> Stay Updated
              </h3>
              <p className="text-xs text-zinc-500 mb-6 font-medium">Never miss a major event in the Lake City.</p>
              
              <form className="space-y-3 relative z-10">
                <input 
                  type="email" 
                  placeholder="pulse@example.com" 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-all placeholder:text-zinc-700 font-medium"
                />
                <button className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black uppercase tracking-widest py-4 rounded-2xl transition-all active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                  Join Newsletter
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Hawassa Pulse
            </p>
            <div className="hidden md:flex gap-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
              <span className="hover:text-zinc-400 transition-colors cursor-default">Ethiopia</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full my-auto" />
              <span className="hover:text-zinc-400 transition-colors cursor-default">Digital Infrastructure</span>
            </div>
          </div>
          
          {/* System Status - Very Professional Tech Detail */}
          <div className="flex items-center gap-3 py-2.5 px-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest italic">
              Systems Nominal
            </span>
          </div>
        </div>
      </div>
    </footer>
  
  );
}

export default Footer;