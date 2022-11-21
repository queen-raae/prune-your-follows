import React from "react";
import { AccountList } from "../accounts";
import useSearch from "./useSearch";

export function SearchResults({ term }) {
  const {
    data: accounts,
    isSuccess,
    isLoading,
    isError,
  } = useSearch({ search: term });

  if (isSuccess && accounts.length === 0) {
    return <>No result</>;
  } else if (isLoading) {
    return <>Searching</>;
  } else if (isError) {
    return <>An error occured</>;
  }

  return <AccountList accounts={accounts} />;
}
