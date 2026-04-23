'use client';



import { useState } from 'react';
import { createEvent } from '@/lib/actions/event.actions';
import { MdCloudUpload, MdDoneAll } from 'react-icons/md';
import Image from 'next/image';

// 1. Define the internal structure of the result
interface CloudinaryResult {
  event: string;
  info: {
    secure_url: string;
    public_id: string;
  };
}

// 2. Define what the Widget Instance looks like (the "handle")
interface CloudinaryWidgetInstance {
  open: () => void;
  close: () => void;
  destroy: () => Promise<void>;
}

// 3. Update the Global Window interface
declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: object, 
        callback: (error: Error | null, result: CloudinaryResult) => void
      ) => CloudinaryWidgetInstance; // Replaced 'any' with the interface above
    };
  }
}

export {}; // Ensures this file is treated as a module

const EventForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'am' | 'si'>('en');
  const [imageUrl, setImageUrl] = useState('');

  // 1. Handlers for Cloudinary (Conceptual)
 const handleUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, 
        folder: 'hawassa_pulse/events',
        sources: ['local', 'url', 'camera'],
        multiple: false,
        styles: {
          palette: {
            window: "#000000",
            sourceBg: "#000000",
            windowBorder: "#1e293b",
            tabIcon: "#0ea5e9",
            inactiveTabIcon: "#64748b",
            menuIcons: "#0ea5e9",
            link: "#0ea5e9",
            action: "#0ea5e9",
            inProgress: "#0ea5e9",
            complete: "#22c55e",
            error: "#ef4444",
            textDark: "#000000",
            textLight: "#ffffff"
          }
        }
      },
      (error: Error | null, result: CloudinaryResult) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImageUrl(result.info.secure_url); // Store the URL for our Server Action
        }
      }
    );

    widget.open();
  };

  const clientAction = async (formData: FormData) => {
    setIsPending(true);
    // Append the Cloudinary URL manually since it's not a standard input
    formData.append('image', imageUrl);
    
    const result = await createEvent(formData);
    
    setIsPending(false);
    if (result.success) {
      alert("Pulse Synced: Event is Live!");
    }
  };

  return (
    <form action={clientAction} className="max-w-4xl bg-slate-950/50 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
      
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Deploy New Event</h2>
        <div className="flex bg-black p-1 rounded-xl border border-white/5">
          {(['en', 'am', 'si'] as const).map((lang) => (
            <button 
              key={lang}
              type="button"
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === lang ? 'bg-sky-500 text-black' : 'text-zinc-500'}`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: General Info */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Event Title</label>
            <input name="title" className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-sky-500 outline-none transition-all" placeholder="e.g. Hawassa Tech Expo" />
          </div>

          {/* Multilingual Description (Dynamic based on Tab) */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Description ({activeTab.toUpperCase()})</label>
            <textarea 
              name={`desc_${activeTab}`} 
              rows={4}
              className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-sky-500 outline-none transition-all" 
              placeholder={`Describe the pulse in ${activeTab}...`}
            />
          </div>
        </div>

        {/* Right Side: Media & Logistics */}
        <div className="space-y-6">
          <div 
            onClick={handleUpload}
            className="h-48 border-2 border-dashed border-white/10 rounded-4xl flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-all group bg-white/1"
          >
            {imageUrl ? (
              <Image src={imageUrl} className="h-full w-full object-cover rounded-4xl" alt="Preview" />
            ) : (
              <>
                <MdCloudUpload size={32} className="text-zinc-700 group-hover:text-sky-500 transition-colors" />
                <span className="text-[10px] font-black text-zinc-600 uppercase mt-2">Upload Cloudinary Asset</span>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <input name="date" type="date" className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs" />
             <input name="time" type="time" className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs" />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full mt-10 bg-sky-500 hover:bg-sky-400 disabled:bg-zinc-800 text-black font-black uppercase py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-sky-500/20"
      >
        {isPending ? "Broadcasting to Pulse..." : <><MdDoneAll size={20}/> Publish to HawassaPulse</>}
      </button>
    </form>
  );
};

export default EventForm;