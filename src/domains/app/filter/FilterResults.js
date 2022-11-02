import React from "react";
import { AccountList } from "../AccountList";
import useFilter from "./useFilter";

export function FilterResults({ filter, ...props }) {
  const { data: accounts } = useFilter({ filter: filter });

  return <AccountList accounts={accounts} {...props} />;
}
