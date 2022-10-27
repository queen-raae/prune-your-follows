import { defaults, mapValues, result } from "lodash";
import React, { useState } from "react";
import { Container } from "../common/Container";
import { AccountCard } from "./AccountCard";
import useSearch from "./useSearch";

const Search = () => {
  const [term, setTerm] = useState("");
  const { data: following } = useSearch({ search: term });

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <Container>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
        Search
      </h1>
      <div className="my-5 font-semibold">
        <input
          className="w-full"
          type="search"
          onChange={handleChange}
          value={term}
        />
      </div>

      <ul className="grid grid-cols-1 gap-6 pt-8 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {(following || []).map((result, index) => {
          return (
            <li key={result.record.id || index}>
              <AccountCard
                {...result.record}
                highlight={result.searchInfo?.highlight}
              />
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Search;
