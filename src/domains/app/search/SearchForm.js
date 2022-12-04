import React from "react";
import { navigate } from "gatsby";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export function SearchForm({ term: encodedTerm, autoFocus }) {
  const term = decodeURIComponent(encodedTerm || "");
  return (
    <form className="flex w-full">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="relative w-full text-stone-600 focus-within:text-green-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          autoFocus={autoFocus}
          id="search-field"
          name="search-field"
          className="block h-full w-full border-transparent bg-white py-3 pl-10 pr-3 text-stone-900 placeholder-stone-600 focus:border-transparent focus:placeholder-stone-300 focus:outline-none focus:ring-0 sm:text-sm"
          placeholder="Search username, name, description and location"
          type="search"
          value={term}
          onChange={(event) => {
            const options = {
              state: { searchAutoFocus: true },
            };
            const newEncodedTerm = encodeURIComponent(event.target.value);
            if (event.target.value) {
              navigate(`/app/search/${newEncodedTerm}/`, options);
            } else {
              navigate(`/app/`, options);
            }
          }}
        />
      </div>
    </form>
  );
}
