import { fetchVenues } from "@/app/lib/venues";
import { VenueCard } from "@/app/components/features/VenueCard";

export default async function Venues() {
  const venues = await fetchVenues();
  return (
    <div>
      <h1>Find your next stay</h1>
      {venues.map((venue) => (
        <VenueCard venue={venue} key={venue.id} />
      ))}
    </div>
  );
}
