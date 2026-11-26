import { BASE_URL } from "@/app/lib/config";
import type { BookingRequest, Booking } from "@/app/types/bookings";

export async function createBooking(
  booking: BookingRequest,
  accessToken: string,
  apiKey: string
): Promise<Booking> {
  const response = await fetch(`${BASE_URL}/holidaze/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(booking),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Booking failed");
  }

  return json.data;
}
