"use server";

import { loginUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export async function login(email: string, password: string) {
  try {
    const user = await loginUser(email, password);
    console.log(user);
  } catch {
    return { error: "Invalid email or password" };
  }
  redirect("/");
}
