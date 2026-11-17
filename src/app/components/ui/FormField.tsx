import { InputHTMLAttributes, useId } from "react";

type FormFieldProps = {
  label: string;
  type?: "text" | "email" | "password";
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormField({
  label,
  type = "text",
  error,
  required,
  ...inputProps
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={id}
        className="text-lg md:text-lg text-ink-900 font-semibold"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-error-text">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
        className="rounded-lg w-full bg-white border border-border px-2 py-3.5 text-base font-light text-ink-900 focus:border-primary focus:outline-none shadow-md"
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="font-medium text-sm text-error-text mb-2 ml-1"
        >
          {error}
        </p>
      )}
    </div>
  );
}
