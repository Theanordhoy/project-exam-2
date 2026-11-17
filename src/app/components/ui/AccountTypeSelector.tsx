import type { RegisterRequest } from "@/app/types/auth";
import { User, House } from "lucide-react";
import { useId } from "react";

type AccountTypeSelectorProps = {
  value: RegisterRequest["venueManager"];
  onChange: (value: RegisterRequest["venueManager"]) => void;
};

const descriptions = {
  customer:
    "For booking venues. If you want to add and manage your own venues, switch to Venue Manager.",
  venueManager:
    "Add and manage your own venues. For booking, switch to Customer.",
};

export function AccountTypeSelector({
  value,
  onChange,
}: AccountTypeSelectorProps) {
  const descriptionId = useId();
  return (
    <fieldset className="w-full min-w-0" aria-describedby={descriptionId}>
      <legend className="text-xl font-semibold mb-2">
        Select account type:
      </legend>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <input
            type="radio"
            name="accountType"
            id="customer"
            checked={!value}
            onChange={() => onChange(false)}
            className="sr-only peer"
          />
          <label
            htmlFor="customer"
            className="flex w-full cursor-pointer items-center justify-center peer-checked:bg-sage peer-checked:border-primary peer-checked:text-primary peer-checked:font-bold peer-checked:inset-shadow-sm shadow-md border border-border rounded-lg text-lg py-2 px-5 bg-white"
          >
            <User className="shrink-0 mr-2" size={20} aria-hidden="true" />
            Customer
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="accountType"
            id="venueManager"
            checked={value}
            onChange={() => onChange(true)}
            className="sr-only peer"
          />
          <label
            htmlFor="venueManager"
            className="flex w-full cursor-pointer items-center justify-center peer-checked:bg-sage peer-checked:border-primary peer-checked:text-primary peer-checked:font-bold peer-checked:inset-shadow-sm shadow-md border border-border rounded-lg text-lg py-2 px-5 bg-white"
          >
            <House className="shrink-0 mr-2" size={20} aria-hidden="true" />
            Venue Manager
          </label>
        </div>
      </div>
      <p
        id={descriptionId}
        aria-live="polite"
        className="my-2 text-base text-ink-900"
      >
        {value ? descriptions.venueManager : descriptions.customer}
      </p>
    </fieldset>
  );
}
