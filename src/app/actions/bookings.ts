"use server";

import { createBooking } from "@/app/lib/bookings";
import type { BookingRequest } from "@/app/types/bookings";
import { getProfile, getAccessToken } from "@/app/lib/session";
import { revalidatePath } from "next/cache";

export async function bookVenue(booking: BookingRequest) {
  const profile = await getProfile();
  const accessToken = await getAccessToken();
  const apiKey = process.env.API_KEY;
  if (!profile) {
    return { error: "Log in as a customer to book" };
  }
  if (profile.venueManager) {
    return { error: "Create customer account to book" };
  }
  if (!accessToken || !apiKey) {
    return { error: "Something went wrong, try to log in again" };
  }
  try {
    await createBooking(booking, accessToken, apiKey);
    revalidatePath(`/venues/${booking.venueId}`);
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to book venue",
    };
  }
}
