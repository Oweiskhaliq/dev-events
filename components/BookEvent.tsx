
"use client";

import { createBooking } from "@/lib/action/booking.actions";
import React, { useState } from "react";

const BookEvent = ({
  eventId,
  slug,
}: {
  eventId: string;
  slug: string;
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      const result = await createBooking({
        eventId,
        slug,
        email,
      });

      if (result.success) {
        setSubmitted(true);
      } else {
        setError("Unable to complete booking");
      }
    } catch {
      setError("Unable to complete booking");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              id="email"
              required
            />
          </div>

          {error && (
            <p className="text-sm" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;

