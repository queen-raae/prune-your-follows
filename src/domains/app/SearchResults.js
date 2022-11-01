import React from "react";
import { AccountCard } from "./AccountCard";
import useSearch from "./useSearch";

export function SearchResults({ term }) {
  const { data: following } = useSearch({ search: term });

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {(following || []).map((result, index) => {
        return (
          <AccountCard
            as="li"
            key={result.record.id || index}
            {...result.record}
            highlight={result.searchInfo?.highlight}
          />
        );
      })}
    </ul>
  );
}
