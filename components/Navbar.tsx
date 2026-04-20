'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdAdminPanelSettings, MdExplore, MdInfo, MdContactSupport, MdLocationCity } from "react-icons/md";
import logo from "@/public/photo.jpg";

const navLinks = [
  { name: "Explore", href: "/events", icon: <MdExplore /> },
  { name: "City Hubs", href: "/hubs", icon: <MdLocationCity /> },
  { name: "Vision", href: "/about", icon: <MdInfo /> },
  { name: "Support", href: "/contact", icon: <MdContactSupport /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    // Prevent body scroll when mobile menu is open
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'mt-0' : 'mt-2 md:mt-4'}`}>
        <header className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <nav className={`flex items-center justify-between transition-all duration-500 border border-white/10 px-4 md:px-6 py-3 ${
            scrolled 
            ? "bg-slate-950/95 backdrop-blur-2xl rounded-none md:rounded-full py-4 shadow-2xl" 
            : "bg-slate-950/40 backdrop-blur-md rounded-2xl md:rounded-[28px]"
          }`}>
            
            {/* Branding: Compact on Mobile */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative h-9 w-9 md:h-10 md:w-10 overflow-hidden rounded-xl border border-sky-500/20">
                <Image src={logo} alt="Hawassa Pulse" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base md:text-lg tracking-tighter text-white leading-none uppercase italic">
                  Hawassa<span className="text-sky-500">Pulse</span>
                </span>
                <span className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase hidden md:block">City Events</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-xs font-bold transition-all uppercase tracking-widest ${
                      pathname === link.href ? "text-sky-400" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions: Desktop CTA + Mobile Toggle */}
            <div className="flex items-center gap-2">
              <Link 
                href="/admin" 
                className="hidden md:flex p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-amber-400 transition-all"
              >
                <MdAdminPanelSettings size={20} />
              </Link>
              
              <Link
                href="/events"
                className="hidden md:block bg-sky-500 hover:bg-sky-400 text-slate-950 px-6 py-2.5 rounded-xl text-sm font-black transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]"
              >
                GET PASS
              </Link>

              {/* Mobile Menu Button: Larger touch target */}
              <button 
                className="md:hidden cursor-pointer text-white p-3 rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform"
                onClick={() => setIsOpen(true)}
              >
                <HiMenuAlt3 size={24} />
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* MOBILE OVERLAY MENU (Slide-up Bottom Sheet Style) */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 " : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-[#050505] border-t border-white/10 rounded-t-[2.5rem] p-8 transition-transform duration-500 ease-out ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag Handle Decor */}
          <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-white uppercase italic">Menu</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 cursor-pointer text-zinc-500">
              <HiX size={28} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                  pathname === link.href 
                  ? "bg-sky-500/10 border-sky-500/50 text-sky-400" 
                  : "bg-white/5 border-white/5 text-white"
                }`}
              >
                <span className="text-lg font-bold">{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Link 
              href="/admin" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 p-4 text-zinc-500 font-bold"
            >
              <MdAdminPanelSettings size={20} /> Administrator Access
            </Link>
            <Link 
              href="/events" 
              onClick={() => setIsOpen(false)}
              className="w-full py-5 bg-sky-500 rounded-2xl text-center text-slate-950 font-black shadow-lg"
            >
              EXPLORE EVENTS
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;