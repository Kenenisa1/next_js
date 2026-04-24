'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteEvent } from '@/lib/actions/event.actions';
import { MdEdit, MdDeleteSweep, MdSearch, MdOpenInNew, MdWarning } from 'react-icons/md';
import { IEvent } from '@/database/event.model';
import { toast } from 'sonner';

interface AdminTableProps {
  events: IEvent[];
}

const AdminTable = ({ events }: AdminTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localEvents, setLocalEvents] = useState<IEvent[]>(events || []);
  

  useEffect(() => {
    // 3. Sync local state only if events is a valid array
    if (Array.isArray(events)) {
      setLocalEvents(events);
    }
  }, [events]);

  /**
   * 4. Safe Filter Logic
   * We use localEvents?.filter to ensure it never attempts to filter 'undefined'
   */
  const filteredEvents = (localEvents || []).filter(event => {
    const title = event?.title?.toLowerCase() ?? "";
    const category = event?.category?.toLowerCase() ?? "";
    const search = searchTerm.toLowerCase();
    return title.includes(search) || category.includes(search);
  });

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    
    try {
      const result = await deleteEvent(deleteId);
      if (result.success) {
        setLocalEvents(prev => prev.filter(e => String(e._id) !== deleteId));
        toast.success("Pulse Erased", {
          description: "The event has been permanently removed from the grid.",
          icon: <MdDeleteSweep className="text-sky-500" size={20} />,
        });
      } else {
        toast.error("Operation Failed", { description: result.message });
      }
    } catch (err) {
      toast.error("System Error", { description: "Could not sync with the database." });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative w-full max-w-md bg-slate-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
                <MdWarning size={32} />
              </div>
              <h3 className="text-xl font-black text-white uppercase italic mb-2 tracking-tighter">Confirm Erasure</h3>
              <p className="text-sm text-zinc-500 mb-8 px-4">
                You are about to permanently delete this pulse. This action is irreversible and will update the public grid.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase text-zinc-400 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-6 py-4 rounded-2xl bg-red-500 text-black text-xs font-black uppercase hover:bg-red-400 transition-all disabled:opacity-50"
                >
                  {isDeleting ? "Erasing..." : "Delete Pulse"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- EXISTING TABLE CONTENT --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-950/40 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
        <div className="relative w-full md:w-96">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input 
            type="text"
            placeholder="Search pulses by title or category..."
            className="w-full bg-black border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs text-white outline-none focus:border-sky-500 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-6 px-4">
          <div className="text-center">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active Pulses</p>
            <p className="text-xl font-black text-sky-500">{localEvents.length}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[2.5rem] border border-white/5 bg-slate-950/20 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Pulse Identity</th>
              <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category & Mode</th>
              <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Schedule</th>
              <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredEvents.map((event) => (
              <tr key={String(event._id)} className="group hover:bg-white/[0.01] transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white/10 bg-black">
                      <Image 
                        src={event.image || '/placeholder.png'} 
                        fill 
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                        alt="Event" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                        {event.title}
                      </p>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">ID: {String(event._id).slice(-6)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-sky-500/80 uppercase bg-sky-500/5 border border-sky-500/10 px-2 py-0.5 rounded-md w-fit">
                      {event.category}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase px-2">
                      {event.mode}
                    </span>
                  </div>
                </td>
                <td className="p-6">
                  <p className="text-xs text-zinc-300 font-medium">{event.date}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{event.time}</p>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <Link 
                      href={`/Event/${event.slug}`} 
                      target="_blank"
                      className="p-2.5 bg-white/5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <MdOpenInNew size={18} />
                    </Link>
                    <Link 
                      href={`/admin/edit/${event._id}`}
                      className="p-2.5 bg-sky-500/10 rounded-xl text-sky-500 hover:bg-sky-500 hover:text-black transition-all"
                    >
                      <MdEdit size={18} />
                    </Link>
                    <button 
                      onClick={() => setDeleteId(String(event._id))}
                      className="p-2.5 bg-red-500/10 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <MdDeleteSweep size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;