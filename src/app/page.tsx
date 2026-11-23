import { fetchVenues } from "@/app/lib/venues";
import { VenueCard } from "@/app/components/features/VenueCard";

export default async function Venues() {
  const venues = await fetchVenues();
  return (
    <div className="px-4">
      <h1>Find your next stay</h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {venues.map((venue) => (
          <VenueCard venue={venue} key={venue.id} />
        ))}
      </div>
    </div>
  );
}
