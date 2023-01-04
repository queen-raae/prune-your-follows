import React from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export function SearchForm({ term, onTermChange, ...props }) {
  return (
    <form className="flex w-full" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="relative w-full text-stone-600 focus-within:text-green-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search-field"
          name="search-field"
          className="block h-full w-full rounded-sm bg-white py-3 pl-10 pr-3 text-stone-900 placeholder-stone-600 focus:placeholder-stone-300 sm:text-sm"
          placeholder="Search username, name, description and location"
          type="search"
          value={term}
          onChange={(event) => {
            onTermChange(event.target.value);
          }}
          {...props}
        />
      </div>
    </form>
  );
}
