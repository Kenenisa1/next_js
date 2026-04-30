import PulseHomeUI from "@/components/PulseHomeUI";

export default async function Page() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  // 1. Initialize a variable to hold your data
  let eventsData = [];

  try {
    const res = await fetch(`${BASE_URL}/api/events`, { 
      cache: "no-store" 
    });

    if (res.ok) {
      const data = await res.json();
      // 2. Assign the data to the variable
      eventsData = data.events || [];
    } else {
      console.error("API responded with an error status");
    }
  } catch (error) {
    // 3. Catch errors silently and keep the default empty array
    console.error("Pulse Fetch Error:", error);
  }

  // 4. Always return the JSX at the top level, outside the try/catch
  return <PulseHomeUI events={eventsData} />;
}