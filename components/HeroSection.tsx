"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LText from "@/components/LanguageFriendlyText";
import ExploreBtn from "./ExploreBtn";

const heroT = {
  badge: { 
    en: "Hawassa City Community Guide", 
    am: "የሀዋሳ ከተማ ማህበረሰብ መሪ" 
  },
  titleMain: { 
    en: "HAWASSA DIGITAL", 
    am: "የሀዋሳ ዲጂታል" 
  },
  titlePulse: { 
    en: "PULSE", 
    am: "ፐልስ" 
  },
  description: {
    en: "Empowering the community by bridging the gap between events, hubs, and people. Save time. Save energy. Grow together.",
    am: "ኩነቶችን፣ ማዕከላትን እና ሰዎችን በማገናኘት ማህበረሰቡን እናበረታታለን። ጊዜዎን ይቆጥቡ። ጉልበትዎን ይቆጥቡ። አብረን እንደግ።"
  }
};

// Custom Cubic Bezier for that "Stripe/Apple" smooth feel
const transition = { duration: 1, ease: [0.16, 1, 0.3, 1] } as const;

const Hero = () => {
  const { language } = useLanguage();
  const isAmharic = language === "am" || language === "si";

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#030014] pt-32 pb-20">
      
      {/* 1. The Animated "Aurora" Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] rounded-full bg-linear-to-br from-primary via-primary/30 to-transparent blur-[120px]" 
          style={{ animation: "aurora 25s ease-in-out infinite" }}
        />
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
        
        {/* Badge - Slide Down & Fade */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="inline-flex items-center rounded-lg border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-10 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
        >
           <LText content={heroT.badge} />
        </motion.div>

        {/* Main Title - Blur Reveal & Staggered Slide */}
        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...transition, delay: 0.2 }}
          className={`
            ${isAmharic ? 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]' : 'text-5xl sm:text-7xl md:text-6xl lg:text-7xl leading-[0.9]'} 
            font-black tracking-tighter text-white uppercase italic mb-8
          `}
        >
          <LText content={heroT.titleMain} /> <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-indigo-400 to-indigo-500 inline-block">
            <LText content={heroT.titlePulse} />
          </span>
        </motion.h1>

        {/* Description - Gentle Fade Up */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.4 }}
          className={`
            max-w-xl mx-auto text-zinc-300 
            ${isAmharic ? 'text-base md:text-lg leading-relaxed' : 'text-lg md:text-xl font-medium leading-relaxed'} 
            mb-12
          `}
        >
          <LText content={heroT.description} />
        </motion.p>

        {/* Call to Action - Zoom In with Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transition, delay: 0.6 }}
          className="relative inline-block w-full max-w-xs transition-transform hover:scale-105 group"
        >
          <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-110 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10">
            <ExploreBtn />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;