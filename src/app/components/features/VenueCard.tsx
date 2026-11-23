import Link from "next/link";
import type { Venue } from "@/app/types/venues";
import { MapPin, ImageOff, Star } from "lucide-react";

type VenueCardProps = {
  venue: Venue;
};

export function VenueCard({ venue }: VenueCardProps) {
  const src = venue.media[0]?.url;
  const alt = venue.media[0]?.alt;
  const city = venue.location.city;
  const country = venue.location.country;
  const place = [city, country].filter((location) => location).join(", ");
  const stars = [1, 2, 3, 4, 5];

  return (
    <Link
      href={`/venues/${venue.id}`}
      className="flex flex-col bg-white w-full max-w-100 shadow-md rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div>
        {src ? (
          <img
            src={src}
            alt={alt || venue.name}
            className="w-full rounded-t-lg h-66.75 object-cover"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-66.75 bg-sage rounded-t-lg">
            <ImageOff aria-hidden="true" size={60} className="text-primary" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 mx-4 my-3 text-sm wrap-break-word">
        <div className="sm:flex sm:flex-row-reverse sm:justify-between sm:items-center">
          <div className="flex items-center justify-end gap-1 text-primary mb-1.5 sm:mb-0 shrink-0">
            <p className="sr-only">Rated {venue.rating} out of 5</p>
            {stars.map((star) => (
              <Star
                key={star}
                fill={star <= venue.rating ? "currentColor" : "none"}
                size={14}
                aria-hidden="true"
              />
            ))}
          </div>
          {place && (
            <div className="flex gap-1 items-center min-w-0">
              <MapPin
                aria-hidden="true"
                size={20}
                className="text-accent shrink-0"
              />
              <p className="min-w-0">{place}</p>
            </div>
          )}
        </div>
        <div>
          <h2 className="font-bold font-sans text-lg">{venue.name}</h2>
          <p>
            <span className="font-semibold text-base">{venue.price} NOK</span>
            /night
          </p>
        </div>
      </div>
    </Link>
  );
}
