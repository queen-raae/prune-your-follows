import clsx from "clsx";
import React from "react";
import { AccountCard } from "./AccountCard";

export function AccountList({ accounts, variant = "grid", className }) {
  return (
    <ul
      className={clsx(
        "flex items-stretch gap-6 [&>*]:w-96 [&>*]:shrink-0 [&>*]:grow-0",
        variant === "grid" && "flex-wrap",
        variant === "row" && "overflow-x-scroll pb-7 [&>*>p]:truncate",
        className
      )}
    >
      {(accounts || []).map((result, index) => {
        const record = result.record || result;
        return (
          <AccountCard
            as="li"
            key={record.id || index}
            {...record}
            highlight={result.searchInfo?.highlight}
          />
        );
      })}
    </ul>
  );
}
