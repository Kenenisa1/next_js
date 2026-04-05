import mongoose from 'mongoose';

/**
 * Global cache for Mongoose connection to prevent multiple connections
 * during development hot reloads in Next.js
 */
declare global {
  var mongooseCache: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  } | undefined;
}

/**
 * MongoDB connection URI from environment variables
 * This should be set in .env.local for local development
 */
const MONGODB_URI: string = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Cached connection object to reuse across requests
 */
let cached: {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

/**
 * Initialize the cached connection object if it doesn't exist
 */
function initializeCache(): void {
  if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
  }
  cached = global.mongooseCache;
}

/**
 * Connect to MongoDB using Mongoose with connection caching
 * This function ensures only one connection is established and reused
 * @returns Promise resolving to the Mongoose connection
 */
async function connectToDatabase(): Promise<mongoose.Connection> {
  // Initialize cache if not already done
  initializeCache();

  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if none exists
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // Disable mongoose buffering to prevent connection issues
        bufferCommands: false,
        // Additional options for production readiness
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      })
      .then(() => mongoose.connection);
  }

  try {
    // Await the connection promise
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise on error to allow retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;