import type { Venue } from "@/app/types/venues";

export function getLocationText(location: Venue["location"]): string {
  const city = location.city;
  const country = location.country;
  const place = [city, country].filter((value) => value).join(", ");

  return place;
}
