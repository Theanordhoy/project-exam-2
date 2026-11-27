import type { Booking } from "@/app/types/bookings";
import type { Venue } from "@/app/types/venues";

export interface Profile {
  name: string;
  email: string;
  bio: string | null;
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
  bookings?: Booking[];
  venues?: Venue[];
}

export interface ProfileResponse {
  data: Profile;
}
