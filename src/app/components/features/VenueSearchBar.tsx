import { MapPin, Users } from "lucide-react";

export function VenueSearchBar() {
  return (
    <form action="/" method="get">
      <div>
        <label htmlFor="venue" className="sr-only">
          Search for venue
        </label>
        <div>
          <span>
            <MapPin aria-hidden="true" size={24} />
          </span>
          <input
            id="venue"
            name="q"
            type="search"
            placeholder="Search for venue"
          />
        </div>
      </div>
      <div>
        <label htmlFor="guests" className="sr-only">
          Enter guests
        </label>
        <div>
          <span>
            <Users aria-hidden="true" size={24} />
          </span>
          <input
            id="guests"
            name="guests"
            type="number"
            placeholder="Enter guests"
            min="1"
          />
        </div>
      </div>
      <button type="submit">Search</button>
    </form>
  );
}
