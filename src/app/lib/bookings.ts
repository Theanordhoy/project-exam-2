import { BASE_URL } from "@/app/lib/config";
import type { BookingRequest, Booking } from "@/app/types/bookings";
import { getHeaders } from "@/app/lib/api";

export async function createBooking(
  booking: BookingRequest,
  accessToken: string,
  apiKey: string
): Promise<Booking> {
  const response = await fetch(`${BASE_URL}/holidaze/bookings`, {
    method: "POST",
    headers: getHeaders(accessToken, apiKey),
    body: JSON.stringify(booking),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Booking failed");
  }

  return json.data;
}
