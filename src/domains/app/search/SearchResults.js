import React from "react";
import { AccountList } from "../AccountList";
import useSearch from "./useSearch";

export function SearchResults({ term }) {
  const { data: accounts } = useSearch({ search: term });

  return <AccountList accounts={accounts} />;
}
