import type { Venue } from "@/app/types/venues";
import { Check, X } from "lucide-react";

type FacilitiesProps = {
  facilities: Venue["meta"];
};

export function Facilities({ facilities }: FacilitiesProps) {
  return (
    <ul className="flex flex-col gap-1">
      {Object.entries(facilities).map(([name, included]) => (
        <li key={name} className="capitalize flex items-center gap-1">
          {included ? (
            <Check aria-hidden="true" size={20} className="text-success-text" />
          ) : (
            <X aria-hidden="true" size={20} className="text-error-text" />
          )}
          {name}
          <span className="sr-only">
            {included ? " Included" : " Not included"}
          </span>
        </li>
      ))}
    </ul>
  );
}
