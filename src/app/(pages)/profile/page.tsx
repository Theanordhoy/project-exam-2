import { getProfile, getAccessToken } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { fetchProfile } from "@/app/lib/profiles";

export default async function Profile() {
  const profile = await getProfile();
  const accessToken = await getAccessToken();
  const apiKey = process.env.API_KEY;

  if (!profile) {
    redirect("/login");
  }

  if (!accessToken || !apiKey) {
    redirect("/login");
  }

  const apiProfile = await fetchProfile(profile.name, accessToken, apiKey);

  console.log(apiProfile);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
