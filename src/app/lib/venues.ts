import { BASE_URL } from "@/app/lib/config";
import type { Venue, VenuesResponse } from "@/app/types/venues";

export async function fetchVenues(): Promise<Venue[]> {
  const response = await fetch(`${BASE_URL}/holidaze/venues`);

  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }

  const result: VenuesResponse = await response.json();
  const venues = result.data;

  return venues;
}

export async function searchVenues(query: string): Promise<Venue[]> {
  const response = await fetch(
    `${BASE_URL}/holidaze/venues/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search for venue");
  }

  const result: VenuesResponse = await response.json();
  const venues = result.data;

  return venues;
}
