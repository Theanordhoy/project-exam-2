import { fetchVenueById } from "@/app/lib/venues";
import { MapPin } from "lucide-react";
import { getLocationText } from "@/app/lib/utils";
import { StarRating } from "@/app/components/ui/StarRating";
import { Facilities } from "@/app/components/features/VenueFacilities";
import { VenueImages } from "@/app/components/features/VenueImages";
import { BookingForm } from "@/app/components/features/BookingForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SingleVenue({ params }: Props) {
  const { id } = await params;
  const venue = await fetchVenueById(id);
  const place = getLocationText(venue.location);

  return (
    <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg">
      <VenueImages images={venue.media} name={venue.name} />
      <div>
        <h1>{venue.name}</h1>
        {place && (
          <div>
            <MapPin
              aria-hidden="true"
              size={20}
              className="text-accent shrink-0"
            />
            <p>{place}</p>
          </div>
        )}
        <p>{venue.maxGuests} guests</p>
        <StarRating rating={venue.rating} />
      </div>
      <div>
        <h2>Description</h2>
        <p>{venue.description}</p>
      </div>
      <div>
        <h2>Facilities</h2>
        <Facilities facilities={venue.meta} />
      </div>
      <div>
        <BookingForm
          bookings={venue.bookings ?? []}
          maxGuests={venue.maxGuests}
          venueId={venue.id}
        />
      </div>
    </div>
  );
}
