"use client";

import { useState } from "react";
import { DayPicker, type DateRange } from "@daypicker/react";
import "@daypicker/react/style.css";
import type { Booking } from "@/app/types/venues";

type VenueCalendarProps = {
  bookings: Booking[];
};

export function VenueCalendar({ bookings }: VenueCalendarProps) {
  const [selected, setSelected] = useState<DateRange | undefined>();
  const bookedRanges = bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  return (
    <div>
      <DayPicker
        mode="range"
        min={1}
        selected={selected}
        onSelect={setSelected}
        disabled={[
          {
            before: new Date(),
          },
          ...bookedRanges,
        ]}
        excludeDisabled
        modifiers={{ booked: bookedRanges }}
        modifiersClassNames={{ booked: "bg-error-bg" }}
      />
    </div>
  );
}
