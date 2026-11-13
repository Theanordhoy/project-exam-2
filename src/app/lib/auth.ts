import { BASE_URL } from "@/app/lib/config";
import type {
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/app/types/auth";

export async function registerUser({
  name,
  email,
  password,
  venueManager,
}: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, venueManager }),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Registration failed");
  }

  return json.data;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login?_holidaze=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Login failed");
  }

  return json.data;
}
