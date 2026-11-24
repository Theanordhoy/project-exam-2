import { MapPin, Users } from "lucide-react";

export function VenueSearchBar() {
  return (
    <form
      action="/"
      method="get"
      className="flex flex-col sm:flex-row border border-border rounded-lg shadow-md"
    >
      <div className="sm:grow">
        <label htmlFor="venue" className="sr-only">
          Search for venue
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MapPin aria-hidden="true" size={24} className="text-primary" />
          </span>
          <input
            id="venue"
            name="q"
            type="search"
            placeholder="Search for venue"
            className="text-lg font-light w-full py-4 pl-11 pr-4"
          />
        </div>
      </div>
      <div className="border-t border-b sm:border-b-0 sm:border-t-0 sm:border-l border-border sm:grow">
        <label htmlFor="guests" className="sr-only">
          Enter guests
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Users aria-hidden="true" size={24} className="text-primary" />
          </span>
          <input
            id="guests"
            name="guests"
            type="number"
            placeholder="Enter guests"
            min="1"
            className="text-lg font-light w-full py-4 pl-11 pr-4"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-hover cursor-pointer text-white text-lg font-heading font-semibold rounded-lg my-2 mx-4 py-2 px-8"
      >
        Search
      </button>
    </form>
  );
}
