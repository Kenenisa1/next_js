import { notFound } from "next/navigation";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import BookEvent from "@/components/BookEvent";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const EventAgenda = ({agenda}: {agenda: string[]} )=> (
    <div>
        <h2 className="text-lg font-bold"> Agenda</h2>
        <ul>
            {agenda.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({tags} : {tags: string[]}) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div key={tag}>
                <p className="text-sm bg-gray-200 px-2 py-1 rounded">{tag}</p>
            </div>
        ))}
    </div>
)
const EventDetailsPage = async ({params} : {params: Promise<{ slug: string}>}) => {
    const { slug } = await params; 
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const { event : {description,image, time , date, overview,location, mode , agenda , audience, organizer  , tags} } = await request.json();


    if(!date) return notFound();

    const bookings = 10;
  return (
    <div className='mt-25 m-15 '> 
        <div>
            <h1>Event Description</h1>
            <p>{description}</p>
        </div>

        <div>
            {/* left side */}
            <div className="content">
                <Image src={image} alt={slug} width={800} height={400} className="banner"/>
                <section className="flex-col-gap-2">
                    <h2>Overview</h2>
                    <p>{overview}</p>
                </section>

                <section>
                    <h2>Event Details</h2>
                    <div className="items-center flex-row gap-3">
                      <FaCalendarAlt className="flex-row-gap-2 "/>
                      <p>{date}</p>  
                    </div>

                    <FaClock className="flex-row-gap-2 "/>
                    <p>{time}</p>
                    <FaMapMarkerAlt className="flex-row-gap-2 "/>
                    <p>{location}</p>
                </section>
                
                <EventAgenda agenda={JSON.parse(agenda[0])}/>

                <section>
                    <h2>
                        About the Orginizer
                    </h2>
                    <p>{organizer}</p>
                </section>

                <EventTags tags={JSON.parse(tags[0])} />
            </div>

            {/* right side */}
            <aside>
                <div>
                    <h2>Book Your Spot</h2>
                    {bookings > 10 ? (
                        <p>
                            Join {bookings} people who have already booked their spot for this event. Don t miss out on an unforgettable experience!
                        </p>
                    ) : 
                    (
                        <p>
                            Be the first to book your spot!
                        </p>
                    )}
                    <BookEvent />
                </div>
                 
            </aside>
        </div>
    </div>
  )
}

export default EventDetailsPage