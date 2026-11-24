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
    <div>
      <section className="bg-white px-4 sm:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-primary text-4xl font-semibold mb-5">
            Find your next stay
          </h1>
          <VenueSearchBar />
        </div>
      </section>
      {filteredVenues.length === 0 ? (
        <p>No venues</p>
      ) : (
        <div className="flex flex-wrap gap-8 px-4 justify-center pt-10">
          {filteredVenues.map((venue) => (
            <VenueCard venue={venue} key={venue.id} />
          ))}
        </div>
      )}
    </div>
  );
}
