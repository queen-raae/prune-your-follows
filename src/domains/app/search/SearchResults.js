import clsx from "clsx";
import React from "react";
import { AccountList } from "../accounts";
import useSearch from "./useSearch";

export function SearchResults({ term }) {
  const { data, isSuccess, isPreviousData, isPlaceholderData, isError } =
    useSearch({
      search: term,
    });

  if (isSuccess && data.records?.length === 0) {
    return <>No result</>;
  } else if (isError) {
    return <>An error occured</>;
  }

  return (
    <AccountList
      accounts={data.records}
      disabled={isPreviousData || isPlaceholderData}
    />
  );
}
