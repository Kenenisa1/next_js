"use client";
import { createBooking } from "@/lib/actions/booking.action";
import posthog from "posthog-js";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createBooking({ eventId, slug, email });
      if (response?.success) {
        setSubmitted(true);
        posthog.capture("event_booked successfully", {
          eventId,
          slug,
          email,
        });
      } else {
        console.error("Booking creation failed");
        posthog.captureException("booking failed");
      }
    } catch (er) {
      console.error("An error occurred while creating booking", er);
      posthog.captureException(er, { context: "booking creation error" });
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-green-400 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-muted-foreground">
            Thank you for booking your spot! Check your email for confirmation
            details.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex text-sm font-medium text-white items-center gap-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full cursor-pointer bg-primary hover:bg-primary/90 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>Book My Spot</>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
