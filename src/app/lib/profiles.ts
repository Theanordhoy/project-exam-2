import { BASE_URL } from "@/app/lib/config";
import { getHeaders } from "@/app/lib/api";
import type { Profile, ProfileResponse } from "@/app/types/profiles";

export async function fetchProfile(
  name: string,
  accessToken: string,
  apiKey: string
): Promise<Profile> {
  const response = await fetch(
    `${BASE_URL}/holidaze/profiles/${encodeURIComponent(
      name
    )}?_bookings=true&_venues=true`,
    {
      headers: getHeaders(accessToken, apiKey),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  const result: ProfileResponse = await response.json();
  const profile = result.data;
  return profile;
}
