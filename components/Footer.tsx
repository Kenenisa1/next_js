import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/photo.jpg'
import { FaTelegramPlane, FaLinkedinIn, FaFacebookF } from 'react-icons/fa' // Swapped for regional relevance
import { cacheLife } from 'next/cache'

const Footer = async() => {
  'use cache';
  cacheLife('hours');

  return (
    <footer className="relative bg-[#030014] border-t border-white/5 overflow-hidden">
      {/* Subtle background glow to match the Hero */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-sky-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-sky-500/20 bg-sky-500/5">
                <Image src={logo} alt="Hawassa Pulse" fill className="object-cover" />
              </div>
              <span className="font-black text-xl tracking-tighter text-white uppercase italic">
                Hawassa<span className="text-sky-500">Pulse</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-8 font-medium">
              Saving energy and time for the Hawassa community. The central source 
              for city events, industrial hubs, and community gatherings.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaTelegramPlane />, href: "#" }, // Telegram is huge in Ethiopia
                { icon: <FaLinkedinIn />, href: "#" },
                { icon: <FaFacebookF />, href: "#" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-sky-400 hover:border-sky-400/50 transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-6">Discover</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/events" className="text-zinc-500 hover:text-white transition-colors">City Events</Link></li>
              <li><Link href="/hubs" className="text-zinc-500 hover:text-white transition-colors">Event Hubs</Link></li>
              <li><Link href="/map" className="text-zinc-500 hover:text-white transition-colors">City Map</Link></li>
            </ul>
          </div>

          {/* Vision/Support (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-6">Organization</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/about" className="text-zinc-500 hover:text-white transition-colors">Our Vision</Link></li>
              <li><Link href="/contact" className="text-zinc-500 hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link href="/privacy" className="text-zinc-500 hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>

          {/* Newsletter (Span 4) */}
          <div className="md:col-span-4">
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 blur-[40px] rounded-full translate-x-10 -translate-y-10 group-hover:bg-sky-500/20 transition-colors duration-700" />
              
              <h3 className="text-white font-bold mb-2">Stay Updated</h3>
              <p className="text-sm text-zinc-500 mb-6 font-medium">Never miss a major event in Hawassa.</p>
              
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-all placeholder:text-zinc-600"
                />
                <button className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-black py-3 rounded-2xl transition-all active:scale-95 shadow-lg shadow-sky-500/10">
                  Join Newsletter
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
             <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
              © {new Date().getFullYear()} Hawassa Pulse
            </p>
            <div className="hidden md:flex gap-6 text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
              <span>Ethiopia</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full my-auto" />
              <span>Digital Infrastructure</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 py-2 px-4 rounded-full bg-white/5 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">
              Pulse Systems Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;