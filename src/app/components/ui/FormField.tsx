import { InputHTMLAttributes, useId, ReactNode } from "react";

type FormFieldProps = {
  label: string;
  type?: "text" | "email" | "password";
  error?: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormField({
  label,
  type = "text",
  error,
  required,
  icon,
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
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-900">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
          className="rounded-lg w-full cursor-pointer bg-white border border-border px-9 py-3.5 text-base font-light text-ink-900 focus:border-primary focus:outline-none shadow-md"
        />
      </div>
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
