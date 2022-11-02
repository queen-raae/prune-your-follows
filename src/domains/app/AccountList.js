import clsx from "clsx";
import React from "react";
import { AccountCard } from "./AccountCard";

export function AccountList({ accounts, variant = "grid", className }) {
  return (
    <ul
      className={clsx(
        variant === "grid" && "grid grid-cols-4 gap-6 ",
        variant === "row" &&
          "flex items-stretch gap-6 overflow-x-scroll pb-7 [&>*]:w-96 [&>*]:shrink-0 [&>*]:grow-0 [&>*]:truncate",
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
