import React from "react";
import { navigate } from "gatsby";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export function SearchForm({ term, autoFocus }) {
  return (
    <form className="flex w-full">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          autoFocus={autoFocus}
          id="search-field"
          name="search-field"
          className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
          placeholder="Search username, name, description and location"
          type="search"
          value={term}
          onChange={(event) => {
            const options = {
              state: { searchAutoFocus: true },
            };
            if (event.target.value) {
              navigate(`/app/search/${event.target.value}/`, options);
            } else {
              navigate(`/app/`, options);
            }
          }}
        />
      </div>
    </form>
  );
}
