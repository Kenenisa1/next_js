'use client'

const ExploreBtn = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex justify-center w-full">
      <a
        href="#events"
        onClick={handleScroll}
        className="
          relative group overflow-hidden
          bg-indigo-600 text-white 
          font-bold text-xl px-10 py-4 
          rounded-2xl w-full sm:w-auto
          text-center shadow-lg shadow-indigo-200
          transition-all duration-300 
          hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-1
          active:scale-95
        "
      >
        {/* Shimmer Effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          Explore Events
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="ArrowRight" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </span>
      </a>
    </div>
  )
}

export default ExploreBtn