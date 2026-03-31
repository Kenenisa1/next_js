import Link from 'next/link'
import Image from 'next/image'

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
            <Image src="/icons/pin.svg" alt='location' width={14} height={14}/>
            <p>{title}</p>
        </Link>
    </div>
  )
}

export default EventCard