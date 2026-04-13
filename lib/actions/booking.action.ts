'use server'

import Booking from '@/database/booking.model';
import  connectToDatabase  from '@/lib/mongodb';

export const createBooking = async ({eventId, slug, email} : { eventId: string, slug: string, email: string}) => {
    
    try {
        await connectToDatabase();
        await Booking.create({  eventId, slug, email });
        return { success: true };
    }
    catch (e) 
    {
        console.log('creating booking failed', e);
        return { success: false}; 
    }
}