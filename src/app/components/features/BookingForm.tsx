"use client";

import { VenueCalendar } from "@/app/components/features/VenueCalendar";
import type { Booking } from "@/app/types/bookings";
import { useState } from "react";
import type { DateRange } from "@daypicker/react";
import { bookVenue } from "@/app/actions/bookings";

type BookingFormProps = {
  bookings: Booking[];
  maxGuests: number;
  venueId: string;
};

export function BookingForm({
  bookings,
  maxGuests,
  venueId,
}: BookingFormProps) {
  const [selected, setSelected] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selected?.from || !selected?.to) {
      return;
    }

    const result = await bookVenue({
      dateFrom: selected.from.toISOString(),
      dateTo: selected.to.toISOString(),
      guests: guests,
      venueId: venueId,
    });
    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <VenueCalendar
        bookings={bookings}
        selected={selected}
        onSelect={setSelected}
      />
      <label htmlFor="guests">Enter guests</label>
      <input
        type="number"
        id="guests"
        min={1}
        max={maxGuests}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
      />
      <button type="submit" className="cursor-pointer">
        Book now
      </button>
    </form>
  );
}
