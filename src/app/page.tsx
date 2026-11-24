import { fetchVenues, searchVenues } from "@/app/lib/venues";
import { VenueCard } from "@/app/components/features/VenueCard";
import { VenueSearchBar } from "@/app/components/features/VenueSearchBar";

type Props = {
  searchParams: Promise<{ q?: string; guests?: string }>;
};

export default async function Venues({ searchParams }: Props) {
  const { q, guests } = await searchParams;
  const query = q?.trim();
  const guestCount = Number(guests);
  const venues = query ? await searchVenues(query) : await fetchVenues();
  const filteredVenues = guestCount
    ? venues.filter((venue) => venue.maxGuests >= guestCount)
    : venues;
  return (
    <div className="px-4">
      <h1>Find your next stay</h1>
      <VenueSearchBar />
      <div className="flex flex-wrap gap-8 justify-center">
        {filteredVenues.map((venue) => (
          <VenueCard venue={venue} key={venue.id} />
        ))}
      </div>
    </div>
  );
}
