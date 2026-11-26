export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export interface BookingRequest {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}
