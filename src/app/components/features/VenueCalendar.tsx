"use client";

import {
  DayPicker,
  type DateRange,
  getDefaultClassNames,
} from "@daypicker/react";

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
  const defaultClassNames = getDefaultClassNames();

  return (
    <div>
      <DayPicker
        mode="range"
        min={1}
        selected={selected}
        onSelect={onSelect}
        classNames={{
          chevron: `${defaultClassNames.chevron} fill-primary`,
          root: `${defaultClassNames.root} bg-white rounded-lg p-2 [--rdp-range_middle-background-color:var(--color-sage)]`,
          selected: `${defaultClassNames.selected} [&>button]:border-primary`,
          range_start: `${defaultClassNames.range_start} [&>button]:bg-primary [&>button]:border-primary`,
          range_end: `${defaultClassNames.range_end} [&>button]:bg-primary [&>button]:border-primary`,
        }}
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
