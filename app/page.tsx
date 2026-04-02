import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";


export default function Home() {
  console.log("What type of component am I?");
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h1 className="text-5xl font-bold">
          The Hub For Every Dev <br /> Event You Cant Miss
        </h1>
        <p>Hackathons, Meetups, Conferences. All in One Place</p>
        <ExploreBtn />
      </main>
      <div>
        <h1 className="mt-20 p-2 text-xl ">Featured Events</h1>
        <ul className="mt-3 flex flex-col lg:flex-row md:flex-row xl:flex-row gap-4">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
