"use server";

import  connectToDatabase  from "@/lib/mongodb";
import Event from "@/database/event.model";
import User from "@/database/user.model"; 


export async function getCityPulseStats() {
  try {
    await connectToDatabase();

    // Run all counts in parallel for better performance
    const [eventCount, userCount] = await Promise.all([
      Event.countDocuments({ status: "published" }),
      User.countDocuments({}),
      // Add other counts here:
      // Hub.countDocuments({}),
      // Partner.countDocuments({}),
    ]);

    return {
      events: eventCount || 0,
      users: userCount || 0,
      hubs: 6, // You can hardcode this or fetch from a Hub model
      partners: 45, // You can hardcode this or fetch from a Partner model
    };
  } catch (error) {
    console.error("Error fetching city stats:", error);
    // Return fallback values so the UI doesn't crash
    return {
      events: 0,
      users: 0,
      hubs: 0,
      partners: 0,
    };
  }
}