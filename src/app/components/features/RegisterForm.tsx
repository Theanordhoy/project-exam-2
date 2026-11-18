"use client";

import { AccountTypeSelector } from "@/app/components/ui/AccountTypeSelector";
import { FormField } from "@/app/components/ui/FormField";
import { registerUser } from "@/app/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AlternativeAuth from "@/app/components/ui/AlternativeAuth";
import { User, Mail, Lock } from "lucide-react";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^\w+$/;

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const newErrors: FieldErrors = {};
    if (!trimmedName) newErrors.name = "Name is required";
    else if (!NAME_REGEX.test(trimmedName))
      newErrors.name = "Name can only contain letters, numbers and underscores";
    if (!trimmedEmail) newErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(trimmedEmail))
      newErrors.email = "Enter a valid email address";
    else if (!trimmedEmail.toLowerCase().endsWith("@stud.noroff.no"))
      newErrors.email = "Email must be a @stud.noroff.no address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";

    setErrors(newErrors);
    setFormError("");
    setSuccessMessage("");
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      await registerUser({
        name: trimmedName,
        email: trimmedEmail,
        password,
        venueManager,
      });
      setSuccessMessage("Registration successful! Redirecting to login...");
      router.push("/login");
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 bg-white p-10 rounded-lg mx-auto w-full max-w-132.5 shadow-md"
      >
        <h1 className="text-3xl font-semibold text-primary mx-auto mb-4">
          Create an account
        </h1>
        <AccountTypeSelector value={venueManager} onChange={setVenueManager} />
        <FormField
          label="Name"
          type="text"
          name="name"
          icon={<User size={18} aria-hidden="true" className="shrink-0" />}
          placeholder="Enter your name"
          required
          disabled={isLoading}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          icon={<Mail size={18} aria-hidden="true" className="shrink-0" />}
          required
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          icon={<Lock size={18} aria-hidden="true" className="shrink-0" />}
          required
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        {formError && (
          <p
            role="alert"
            className="rounded-md px-3 py-2 text-sm text-error-text"
          >
            {formError}
          </p>
        )}
        {successMessage && (
          <p
            role="status"
            className="rounded-md px-3 py-2 text-sm text-green-700"
          >
            {successMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="inline-flex w-full justify-center bg-primary text-lg font-semibold shadow-md mt-2 text-white py-2.5 rounded-md"
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        <AlternativeAuth mode="register" />
      </form>
    </div>
  );
}
