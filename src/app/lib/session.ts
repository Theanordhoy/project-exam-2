import { cookies } from "next/headers";
import type { SessionProfile } from "@/app/types/auth";

const COOKIE_ACCESS_TOKEN = "accessToken";
const COOKIE_PROFILE = "profile";
const ONE_WEEK = 60 * 60 * 24 * 7;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: ONE_WEEK,
} as const;

export async function createSession(
  accessToken: string,
  profile: SessionProfile
) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_ACCESS_TOKEN, accessToken, COOKIE_OPTIONS);
  cookieStore.set(COOKIE_PROFILE, JSON.stringify(profile), COOKIE_OPTIONS);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_ACCESS_TOKEN);
  cookieStore.delete(COOKIE_PROFILE);
}

export async function getProfile(): Promise<SessionProfile | null> {
  const cookieStore = await cookies();
  const profileCookie = cookieStore.get(COOKIE_PROFILE);
  if (!profileCookie) return null;
  try {
    return JSON.parse(profileCookie.value) as SessionProfile;
  } catch {
    return null;
  }
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_ACCESS_TOKEN)?.value ?? null;
}
