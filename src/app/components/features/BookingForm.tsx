"use client";

import { VenueCalendar } from "@/app/components/features/VenueCalendar";
import type { Booking } from "@/app/types/bookings";
import { useState } from "react";
import type { DateRange } from "@daypicker/react";
import { bookVenue } from "@/app/actions/bookings";
import Link from "next/link";

type BookingFormProps = {
  bookings: Booking[];
  maxGuests: number;
  venueId: string;
  isLoggedIn: boolean;
  isVenueManager: boolean;
};

export function BookingForm({
  bookings,
  maxGuests,
  venueId,
  isLoggedIn,
  isVenueManager,
}: BookingFormProps) {
  const [selected, setSelected] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;

    setFormError("");
    setSuccessMessage("");

    if (!selected?.from || !selected?.to) {
      setFormError("Pick a date");
      return;
    }

    setIsLoading(true);
    const result = await bookVenue({
      dateFrom: selected.from.toISOString(),
      dateTo: selected.to.toISOString(),
      guests: guests,
      venueId: venueId,
    });

    if (result?.error) {
      setFormError(result.error);
    } else {
      setSuccessMessage("Venue is booked");
      setSelected(undefined);
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <VenueCalendar
        bookings={bookings}
        selected={selected}
        onSelect={setSelected}
      />
      {!isLoggedIn && <Link href="/login">Log in to book</Link>}
      {isLoggedIn && isVenueManager && (
        <p>
          Venue manager accounts cannot book venues. Log out and register as a
          customer to make a booking.
        </p>
      )}
      {isLoggedIn && !isVenueManager && (
        <div>
          <label htmlFor="guests">Enter guests</label>
          <input
            type="number"
            id="guests"
            min={1}
            max={maxGuests}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
          {formError && (
            <p
              role="alert"
              className="rounded-md px-3 py-2 text-sm text-error-text bg-error-bg"
            >
              {formError}
            </p>
          )}
          {successMessage && (
            <p
              role="status"
              className="rounded-md px-3 py-2 text-sm text-success-text bg-success-bg"
            >
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? "Booking..." : "Book now"}
          </button>
        </div>
      )}
    </form>
  );
}
