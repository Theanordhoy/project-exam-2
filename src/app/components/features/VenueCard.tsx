import Link from "next/link";
import type { Venue } from "@/app/types/venues";
import { MapPin, ImageOff } from "lucide-react";

type VenueCardProps = {
  venue: Venue;
};

export function VenueCard({ venue }: VenueCardProps) {
  const src = venue.media[0]?.url;
  const alt = venue.media[0]?.alt;
  const city = venue.location.city;
  const country = venue.location.country;
  const place = [city, country].filter((location) => location).join(", ");

  return (
    <Link href={`/venues/${venue.id}`}>
      <div>
        {src ? (
          <img src={src} alt={alt || venue.name} />
        ) : (
          <ImageOff aria-hidden="true" />
        )}
      </div>
      <div>
        {place && (
          <div>
            <MapPin aria-hidden="true" />
            <p>{place}</p>
          </div>
        )}
        <h2>{venue.name}</h2>
        <p>{venue.price} NOK/night</p>
      </div>
    </Link>
  );
}
