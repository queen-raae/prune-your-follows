import React from "react";
import { AccountList } from "../AccountList";
import useSearch from "./useSearch";

export function SearchResults({ term }) {
  const {
    data: accounts,
    isSuccess,
    status,
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
