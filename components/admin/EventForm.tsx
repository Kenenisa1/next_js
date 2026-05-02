"use client";

import { useState } from "react";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { useRouter } from "next/navigation";
import {
  MdOutlinePhotoSizeSelectActual,
  MdCheckCircle,
  MdLanguage,
  MdEventNote,
  MdStar,
  MdErrorOutline,
  MdClose,
  MdLabelOutline,
  MdArrowBack,
  MdListAlt,
} from "react-icons/md";
import Image from "next/image";
import { IEvent } from "@/database/event.model";

interface EventFormProps {
  initialData?: IEvent;
  type: "Create" | "Update";
}

const TRANSLATIONS = {
  en: {
    header: "Pulse Asset",
    systemConfig: "System Configuration",
    initVisuals: "Initialize Visuals",
    promote: "Promote to Featured",
    titlePlace: "EVENT TITLE",
    summary: "Executive Summary",
    overview: "Technical Overview",
    agenda: "Agenda (Line per item)",
    tags: "Tags (Comma separated)",
    logistics: "Logistics",
    date: "Date",
    time: "Time",
    mode: "Mode",
    category: "Category",
    spatial: "Spatial Mapping",
    city: "City Hub",
    venue: "Venue Name",
    price: "Fee",
    capacity: "Total Capacity",
    audience: "Target Audience",
    status: "Status",
    submitCreate: "Deploy Broadcast",
    submitUpdate: "Commit Changes",
    syncing: "Syncing...",
  },
  am: {
    header: "የአሁኑ መረጃ",
    systemConfig: "የስርዓት ውቅር",
    initVisuals: "ምስል ያስገቡ",
    promote: "ወደ ልዩ መረጃ ቀይር",
    titlePlace: "የመረጃው ርዕስ",
    summary: "አጭር መግለጫ",
    overview: "ጥልቅ ዝርዝር መረጃ",
    agenda: "መርሃ ግብር (በመስመር)",
    tags: "መለያዎች (በኮማ)",
    logistics: "ሎጂስቲክስ",
    date: "ቀን",
    time: "ሰዓት",
    mode: "ሁኔታ",
    category: "ምድብ",
    spatial: "ቦታ",
    city: "ከተማ",
    venue: "የቦታው ስም",
    price: "ክፍያ",
    capacity: "ጠቅላላ ቦታ",
    audience: "ታዳሚ",
    status: "ሁኔታ",
    submitCreate: "መረጃውን አሰራጭ",
    submitUpdate: "ለውጦችን መዝግብ",
    syncing: "በማመሳሰል ላይ...",
  },
};

const EventForm = ({ initialData, type }: EventFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [activeTab, setActiveTab] = useState<"en" | "am" | "si">("en");
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const router = useRouter();

  // Controlled State to preserve data on error
  const [formState, setFormState] = useState({
    title_en: initialData?.title?.en || "",
    title_am: initialData?.title?.am || "",
    title_si: initialData?.title?.si || "",
    desc_en: initialData?.description?.en || "",
    desc_am: initialData?.description?.am || "",
    desc_si: initialData?.description?.si || "",
    overview_en: initialData?.overview?.en || "",
    overview_am: initialData?.overview?.am || "",
    overview_si: initialData?.overview?.si || "",
    agenda:
      initialData?.agenda?.map((a) => a[activeTab] || "").join("\n") || "",
    tags: initialData?.tags?.join(", ") || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    mode: initialData?.mode || "offline",
    category: initialData?.category || "Technology",
    status: initialData?.status || "draft",
    hub: initialData?.hub || "",
    venue: initialData?.venue || "",
    location: initialData?.location || "",
    audience: initialData?.audience || "",
    price: initialData?.price || 0,
    totalCapacity: initialData?.totalCapacity || 0,
  });

  const t = TRANSLATIONS[activeTab === "am" ? "am" : "en"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleUpload = () => {
    if (typeof window !== "undefined" && (window as any).cloudinary) {
      (window as any).cloudinary
        .createUploadWidget(
          {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
            folder: "hawassa_pulse/events",
            styles: {
              palette: {
                window: "#000",
                sourceBg: "#000",
                windowBorder: "#18181b",
                tabIcon: "#0ea5e9",
                textLight: "#fff",
              },
            },
          },
          (error: any, result: any) => {
            if (!error && result?.event === "success")
              setImageUrl(result.info.secure_url);
          },
        )
        .open();
    }
  };

  const clientAction = async () => {
    // Removed the 'formData' parameter
    if (!imageUrl) return showToast("Master Image is required", "error");

    setIsPending(true);

    // Create a new FormData object manually from your REACT STATE
    const dataToSend = new FormData();

    // Append all fields from your formState
    dataToSend.append("title_en", formState.title_en);
    dataToSend.append("title_am", formState.title_am);
    dataToSend.append("desc_en", formState.desc_en);
    dataToSend.append("desc_am", formState.desc_am);
    dataToSend.append("overview_en", formState.overview_en);
    dataToSend.append("overview_am", formState.overview_am);
    dataToSend.append("agenda", formState.agenda);
    dataToSend.append("tags", formState.tags);
    dataToSend.append("date", formState.date);
    dataToSend.append("time", formState.time);
    dataToSend.append("mode", formState.mode);
    dataToSend.append("category", formState.category);
    dataToSend.append("hub", formState.hub);
    dataToSend.append("venue", formState.venue);
    dataToSend.append("location", formState.location);
    dataToSend.append("audience", formState.audience);
    dataToSend.append("price", String(formState.price));
    dataToSend.append("totalCapacity", String(formState.totalCapacity));
    dataToSend.append("status", formState.status);
    dataToSend.append("image", imageUrl);
    dataToSend.append("organizer", "Kenenisa Mieso");

    try {
      const result =
        type === "Update" && initialData?._id
          ? await updateEvent(initialData._id as string, dataToSend)
          : await createEvent(dataToSend);

      if (result.success) {
        showToast("Deployed successfully!", "success");
        // Only reset here if you want to clear the form
      } else {
        showToast(result.message, "error"); // formState remains, so data is saved
      }
    } catch (error) {
      showToast("Pulse Server Connection Failed", "error");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-32 px-6 relative text-zinc-300">

      <button 
    type="button"
    onClick={() => router.back()}
    className="group cursor-pointer mb-8 flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 px-6 py-3 rounded-2xl transition-all active:scale-95"
  >
    <MdArrowBack className="text-sky-500 group-hover:-translate-x-1 transition-transform" size={20} />
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white">
      Back to admin
    </span>
  </button>
      {toast && (
        <div
          className={`fixed top-10 right-10 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-2xl border shadow-2xl ${
            toast.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {toast.type === "success" ? (
            <MdCheckCircle size={24} />
          ) : (
            <MdErrorOutline size={24} />
          )}
          <p className="text-[11px] font-black uppercase tracking-widest">
            {toast.message}
          </p>
          <button onClick={() => setToast(null)}>
            <MdClose size={18} />
          </button>
        </div>
      )}

      <form action={clientAction} className="space-y-12">
        {/* IMAGE UPLOADER */}
        <section
          onClick={handleUpload}
          className="group relative h-[400px] w-full rounded-[3rem] overflow-hidden bg-black border border-white/5 cursor-pointer"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              fill
              className="object-cover brightness-50"
              alt="Cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600">
              <MdOutlinePhotoSizeSelectActual size={40} />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] mt-4">
                {t.initVisuals}
              </p>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-zinc-950/40 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-3xl space-y-10 shadow-2xl">
              {/* HEADER CONTROLS */}
              <div className="flex flex-wrap items-center justify-between gap-6">
                {/* Language Toggles */}
                <div className="flex gap-1 bg-black/40 p-1 rounded-2xl border border-white/5 shadow-inner">
                  {["en", "am", "si"].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveTab(lang as any)}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                        activeTab === lang
                          ? "bg-sky-500 text-black shadow-lg shadow-sky-500/20 scale-105"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Promotion Toggle */}
                <label className="group flex items-center gap-3 cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] px-6 py-2.5 rounded-2xl border border-white/5 transition-all">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={initialData?.isFeatured}
                    className="hidden peer"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 peer-checked:text-amber-500">
                    {t.promote}
                  </span>
                  <MdStar
                    className="text-zinc-800 peer-checked:text-amber-500 group-hover:scale-125 transition-transform"
                    size={20}
                  />
                </label>
              </div>

              {/* DYNAMIC TITLE FIELD */}
              <div className="relative group">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-sky-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all" />
                <input
                  name={`title_${activeTab}`}
                  value={(formState as any)[`title_${activeTab}`]}
                  onChange={handleInputChange}
                  required
                  placeholder={t.titlePlace}
                  className="w-full bg-transparent text-6xl font-black text-white outline-none italic uppercase tracking-tighter placeholder:text-zinc-800"
                />
              </div>

              {/* TEXT AREAS */}
              <div className="grid gap-10">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[10px] font-black text-sky-500/80 uppercase tracking-[0.2em]">
                    <MdLanguage size={16} /> {t.summary}{" "}
                    <span className="text-zinc-600">[{activeTab}]</span>
                  </label>
                  <textarea
                    name={`desc_${activeTab}`}
                    value={(formState as any)[`desc_${activeTab}`]}
                    onChange={handleInputChange}
                    className="sidebar-input min-h-[100px] text-lg leading-relaxed"
                    placeholder="Write a captivating hook..."
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[10px] font-black text-sky-500/80 uppercase tracking-[0.2em]">
                    <MdListAlt size={16} /> {t.overview}{" "}
                    <span className="text-zinc-600">[{activeTab}]</span>
                  </label>
                  <textarea
                    name={`overview_${activeTab}`}
                    value={(formState as any)[`overview_${activeTab}`]}
                    onChange={handleInputChange}
                    className="sidebar-input min-h-[350px] font-light leading-[1.8]"
                    placeholder="Detail the experience..."
                  />
                </div>
              </div>
            </div>

            {/* SECONDARY GRIDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950/30 border border-white/5 p-8 rounded-[2rem] space-y-4 backdrop-blur-xl">
                <label className="sidebar-label text-zinc-400">
                  <MdEventNote className="text-sky-500" /> {t.agenda}
                </label>
                <textarea
                  name="agenda"
                  value={formState.agenda}
                  onChange={handleInputChange}
                  className="sidebar-input min-h-[180px] bg-transparent border-none focus:ring-0 p-0"
                />
              </div>

              <div className="bg-zinc-950/30 border border-white/5 p-8 rounded-[2rem] space-y-4 backdrop-blur-xl">
                <label className="sidebar-label text-zinc-400">
                  <MdLabelOutline className="text-sky-500" /> {t.tags}
                </label>
                <textarea
                  name="tags"
                  value={formState.tags}
                  onChange={handleInputChange}
                  placeholder="AI, Event, Tech..."
                  className="sidebar-input min-h-[180px] bg-transparent border-none focus:ring-0 p-0 font-mono text-sky-400"
                />
              </div>
            </div>
          </div>

          {/* SIDEBAR PLACEHOLDER (Keep your existing sidebar here) */}
          <aside className="lg:col-span-4">
            {/* ... existing sidebar code ... */}
          </aside>
        </div>
      </form>

      <style jsx>{`
        .sidebar-label {
          @apply flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest;
        }
        .sidebar-input {
          @apply w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm text-white outline-none focus:border-sky-500/50 transition-all;
        }
        select option {
          background: #000;
        }
      `}</style>
    </div>
  );
};

export default EventForm;
