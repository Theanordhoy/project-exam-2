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
    <form onSubmit={handleSubmit} className="bg-sage rounded-lg p-4 max-w-sm">
      <div className="mx-auto w-fit ">
        <h2 className="text-primary font-sans text-xl font-semibold">
          Book this venue
        </h2>
        <VenueCalendar
          bookings={bookings}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {!isLoggedIn && <Link href="/login">Log in to book</Link>}
      {isLoggedIn && isVenueManager && (
        <p>
          Venue manager accounts cannot book venues. Log out and register as a
          customer to make a booking.
        </p>
      )}
      {isLoggedIn && !isVenueManager && (
        <div className="flex flex-col gap-3 my-4">
          <div className="flex items-center gap-2 border rounded-lg px-2 bg-white shadow-md">
            <label htmlFor="guests" className="shrink-0">
              Enter guests
            </label>
            <input
              type="number"
              id="guests"
              min={1}
              max={maxGuests}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="border-l p-2 w-full  focus:outline-primary "
            />
          </div>
          {formError && (
            <p
              role="alert"
              className="rounded-md px-3 py-2 text-sm text-error-text bg-error-bg border border:error-text"
            >
              {formError}
            </p>
          )}
          {successMessage && (
            <p
              role="status"
              className="rounded-md px-3 py-2 text-sm text-success-text bg-success-bg border border:success-text"
            >
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="cursor-pointer bg-primary text-white text-lg font-semibold p-2 rounded-lg shadow-md hover:bg-primary-hover"
          >
            {isLoading ? "Booking..." : "Book now"}
          </button>
        </div>
      )}
    </form>
  );
}
