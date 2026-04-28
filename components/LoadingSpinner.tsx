'use client';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full bg-black">
      <div className="relative flex items-center justify-center">
        {/* The "Pulse" Rings */}
        <div className="absolute h-24 w-24 rounded-full border border-sky-500/20 animate-ping" />
        <div className="absolute h-16 w-16 rounded-full border border-sky-500/40 animate-pulse" />
        
        {/* The Main Spinning Tech-Ring */}
        <div className="relative">
          <svg
            className="animate-spin h-12 w-12 text-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-10"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>

      {/* Futuristic Loading Text */}
      <div className="mt-8 flex flex-col items-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500 italic animate-pulse">
          Syncing Pulse
        </span>
        <div className="mt-2 h-px w-12 bg-linear-to-r from-transparent via-sky-500/50 to-transparent" />
      </div>
    </div>
  );
};

export default LoadingSpinner;