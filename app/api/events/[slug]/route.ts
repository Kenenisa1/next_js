import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

// Define the params type for the dynamic route
interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 * @param request - The incoming request object
 * @param params - Route parameters containing the slug (async in Next.js 15+)
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Await the params as they are async in Next.js 15+
    const resolvedParams = await params;

    // Validate slug parameter
    const { slug } = resolvedParams;
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { message: 'Invalid slug parameter' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Query for the event by slug
    const event = await Event.findOne({ slug }).lean();

    // Check if event exists
    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    // Return the event data
    return NextResponse.json(
      { message: 'Event retrieved successfully', event },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching event:', error);

    // Handle different types of errors
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Failed to fetch event', error: error.message },
        { status: 500 }
      );
    }

    // Fallback for unknown errors
    return NextResponse.json(
      { message: 'Failed to fetch event', error: 'Unknown error occurred' },
      { status: 500 }
    );
  }
}