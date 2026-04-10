import { notFound } from "next/navigation";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Sub-component: Agenda with a modern timeline feel
const EventAgenda = ({ agenda }: { agenda: string[] }) => (
  <div className="mt-10">
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
      <div className="w-1 h-6 bg-primary rounded-full" /> Agenda
    </h2>
    <ul className="space-y-4">
      {agenda.map((item, index) => (
        <li
          key={index}
          className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <span className="text-primary font-mono font-bold">0{index + 1}</span>
          <p className="text-muted-foreground">{item}</p>
        </li>
      ))}
    </ul>
  </div>
);

// Sub-component: Modern Pill Tags
const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-2 flex-wrap mt-8">
    {tags.map((tag) => (
      <span
        key={tag}
        className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider"
      >
        #{tag}
      </span>
    ))}
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const data = await request.json();

  if (!data.event || !data.event.date) return notFound();

  const {
    description,
    image,
    time,
    date,
    overview,
    location,
    agenda,
    organizer,
    tags,
  } = data.event;
  const bookings = 10;
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  // Example count

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 pt-24 sm:pt-28">
      {/* Hero Header */}
      <div className="relative h-[42vh] md:h-[52vh] w-full overflow-hidden rounded-b-[3rem] shadow-2xl shadow-black/50">
        <Image
          src={image}
          alt={slug}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)] pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full max-w-7xl mx-auto px-6 pb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight max-w-4xl">
            {description}
          </h1>
          <div className="flex flex-wrap gap-6 text-sm md:text-base text-zinc-300">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" /> {date}
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-primary" /> {time}
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" /> {location}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* LEFT SIDE: Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {overview}
            </p>
          </section>

          <EventAgenda agenda={agenda} />

          <section className="p-8 rounded-2xl bg-linear-to-br from-card to-zinc-900 border border-border">
            <h2 className="text-xl font-bold text-white mb-3">
              About the Organizer
            </h2>
            <p className="text-muted-foreground leading-relaxed">{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        {/* RIGHT SIDE: Booking Sidebar */}
        <aside className="relative">
          <div className="sticky top-32 p-6 rounded-3xl bg-card border border-border shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FaCheckCircle />
              <span className="text-sm font-bold uppercase">
                Registration Open
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Book Your Spot
            </h2>

            <div className="bg-zinc-900/50 rounded-2xl p-4 mb-6 border border-white/5">
              {bookings > 10 ? (
                <p className="text-sm text-muted-foreground flex items-center gap-3">
                  <FaUsers className="text-xl text-zinc-400" />
                  <span>
                    Join <b className="text-white">{bookings} others</b> who
                    have already secured their place!
                  </span>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Be the first to secure your spot at this exclusive event!
                </p>
              )}
            </div>

            <BookEvent />

            <p className="text-[10px] text-zinc-500 mt-4 text-center px-4 uppercase tracking-widest">
              Secure checkout • Instant Confirmation
            </p>
          </div>
        </aside>
      </main>
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
          <div className="w-1 h-8 bg-primary rounded-full" /> Similar Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarEvents
            .filter((event) => event.image?.trim() && event.title?.trim())
            .map((event: IEvent) => (
              <EventCard key={event.slug} {...event} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default EventDetailsPage;
