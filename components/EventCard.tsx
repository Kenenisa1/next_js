import Link from 'next/link'
import Image from 'next/image'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

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
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/events/${slug}`} className="block">
        
        {/* Image Container */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Optional Badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
            Upcoming
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Location */}
          <div className="flex items-center text-gray-500 text-xs mb-2">
            <FaMapMarkerAlt className="text-indigo-500 mr-1.5" />
            <span className="truncate font-medium">{location}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>

          <hr className="border-gray-50 mb-4" />

          {/* Metadata Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 text-sm">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <FaClock className="text-gray-400 mr-2" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default EventCard