import Link from 'next/link'
import Image from 'next/image'
import { FaCalendar, FaClock, FaSearchLocation } from 'react-icons/fa';

interface Props {
title: string;
image : string ;
slug: string;
location: string;
date: string;
time: string
}

const EventCard = ({title,image, slug, location, date, time}: Props) => {
  return (
    <div>
        <Link href={`/events/${slug}}`} id='event-card'>
            <Image src={image} alt={title} width={410} height={300}/>
            <div>
              <FaSearchLocation className='inline-block mr-1'/>
              <p>{location}</p>
            </div>
            <p className='title'>{title}</p>
            <div>
              <div>
                <FaCalendar className='inline-block mr-1'/>
                <p>{date} </p>
              </div>
              <div>
                <FaClock className='inline-block mr-1'/>
                <p>{time} </p>
              </div>
            </div>
        </Link>
    </div>
  )
}

export default EventCard