import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link
      href={`/events/${slug}`}
      className="group block rounded-[28px] border border-white/10 bg-[#07070f] shadow-[0_32px_90px_-40px_rgba(99,102,241,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/20 hover:shadow-[0_35px_100px_-45px_rgba(99,102,241,0.45)]"
    >
      <div className="relative h-56 w-full overflow-hidden rounded-t-[28px]">
        {image ? (
          <Image
            src={image}
            alt={title || "Event image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-100 backdrop-blur shadow-sm">
          Upcoming
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center text-zinc-400 text-xs mb-3">
          <FaMapMarkerAlt className="text-indigo-400 mr-2" />
          <span className="truncate font-medium">{location}</span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-4 line-clamp-1 group-hover:text-indigo-300 transition-colors">
          {title}
        </h3>

        <div className="border-t border-white/5 pt-4 flex items-center justify-between text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-zinc-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-zinc-500" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
