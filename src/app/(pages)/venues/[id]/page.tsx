import { fetchVenueById } from "@/app/lib/venues";
import { MapPin } from "lucide-react";
import { getLocationText } from "@/app/lib/utils";
import { StarRating } from "@/app/components/ui/StarRating";
import { Facilities } from "@/app/components/features/VenueFacilities";
import { VenueImages } from "@/app/components/features/VenueImages";
import { BookingForm } from "@/app/components/features/BookingForm";
import { getProfile } from "@/app/lib/session";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SingleVenue({ params }: Props) {
  const { id } = await params;
  const venue = await fetchVenueById(id);
  const place = getLocationText(venue.location);
  const profile = await getProfile();
  const isLoggedIn = !!profile;
  const isVenueManager = profile?.venueManager ?? false;

  return (
    <div className="sm:px-4">
      <div className="bg-white max-w-4xl mx-auto p-4 sm:p-8 rounded-lg shadow-md my-4">
        <VenueImages images={venue.media} name={venue.name} />
        <div>
          <h1 className="text-primary text-3xl font-semibold mt-4">
            {venue.name}
          </h1>
          {place && (
            <div className="flex items-center gap-1 my-1">
              <MapPin
                aria-hidden="true"
                size={20}
                className="text-accent shrink-0"
              />
              <p>{place}</p>
            </div>
          )}
          <div className="flex items-center gap-4 sm:gap-6 my-4 flex-wrap">
            <p>
              <span className="font-semibold">{venue.price} NOK</span>/night
            </p>
            <StarRating rating={venue.rating} />
            <p className="bg-forest-100 py-1 px-4 rounded-lg">
              {venue.maxGuests} guests
            </p>
          </div>
        </div>
        <div className="md:flex md:gap-4">
          <div>
            <div className="flex flex-col gap-1 my-4">
              <h2 className="text-xl font-sans font-semibold">Description</h2>
              <p>{venue.description}</p>
            </div>
            <div className="flex flex-col gap-1 my-4">
              <h2 className="text-xl font-sans font-semibold">Facilities</h2>
              <Facilities facilities={venue.meta} />
            </div>
          </div>
          <div className="shrink-0 md:w-sm">
            <BookingForm
              bookings={venue.bookings ?? []}
              maxGuests={venue.maxGuests}
              venueId={venue.id}
              isLoggedIn={isLoggedIn}
              isVenueManager={isVenueManager}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
