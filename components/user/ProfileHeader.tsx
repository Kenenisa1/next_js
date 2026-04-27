import Image from "next/image";
import { FaMapMarkerAlt, FaLink, FaCalendarAlt } from "react-icons/fa";
import LText from "./LanguageFriendlyText";

interface Props {
  user: any;
}

const ProfileHeader = ({ user }: Props) => {
  return (
    <div className="w-full bg-[#000000] border-b border-white/10 pb-12">
      <div className="relative h-48 w-full bg-gradient-to-r from-sky-900/20 to-indigo-900/20">
        {/* Abstract pattern or cover image could go here */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative -mt-16 flex flex-col md:flex-row items-end gap-6">
          <div className="relative h-40 w-40 rounded-[2.5rem] border-4 border-[#000000] overflow-hidden bg-zinc-900 shadow-2xl">
            <Image
              src={user.picture}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 pb-2">
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
              {user.name}
            </h1>
            <p className="text-sky-500 font-bold tracking-widest text-xs uppercase mt-1">
              @{user.username} • {user.role}
            </p>
          </div>

          <div className="flex gap-3 pb-2">
            <button className="px-6 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-zinc-200 transition-all">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-zinc-400 text-sm font-medium">
          {user.location && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-500" />
              <span>{user.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-sky-500" />
            <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
          </div>
          {user.portfolioWebsite && (
            <div className="flex items-center gap-2">
              <FaLink className="text-sky-500" />
              <a href={user.portfolioWebsite} className="hover:text-white transition-colors">
                {user.portfolioWebsite}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;