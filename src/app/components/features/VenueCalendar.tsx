"use client";

import { DayPicker, type DateRange } from "@daypicker/react";
import "@daypicker/react/style.css";
import type { Booking } from "@/app/types/bookings";

type VenueCalendarProps = {
  bookings: Booking[];
  selected: DateRange | undefined;
  onSelect: (value: DateRange | undefined) => void;
};

export function VenueCalendar({
  bookings,
  selected,
  onSelect,
}: VenueCalendarProps) {
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
        onSelect={onSelect}
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
