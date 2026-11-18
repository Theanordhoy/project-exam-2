"use client";

import { FormField } from "@/app/components/ui/FormField";
import { login } from "@/app/actions/auth";
import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import AlternativeAuth from "@/app/components/ui/AlternativeAuth";

type FieldErrors = {
  email?: string;
  password?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;

    const trimmedEmail = email.trim();

    const newErrors: FieldErrors = {};
    if (!trimmedEmail) newErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(trimmedEmail))
      newErrors.email = "Enter a valid email address";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    setFormError("");
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    const result = await login(trimmedEmail, password);
    if (result?.error) {
      setFormError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 w-full bg-white p-10 rounded-lg mx-auto max-w-132.5 shadow-md"
      >
        <h1 className="text-3xl font-semibold text-primary mx-auto mb-4">
          Welcome back!
        </h1>
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
        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="inline-flex w-full justify-center items-center bg-primary text-lg gap-1 font-semibold shadow-md mt-2 text-white py-2.5 rounded-md"
        >
          {isLoading ? "Logging in..." : "Login"}
          <LogIn size={18} aria-hidden="true" className="shrink-0" />
        </button>
        <AlternativeAuth mode="login" />
      </form>
    </div>
  );
}
