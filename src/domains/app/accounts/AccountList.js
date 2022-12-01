import clsx from "clsx";
import React from "react";
import { AccountCard } from "./AccountCard";

export function AccountList(props) {
  const { accounts, variant = "grid", pagination, disabled, className } = props;
  console.log(props);
  return (
    <>
      <ul
        className={clsx(
          "transition-opacity",
          disabled ? "opacity-60" : "opacity-100",
          variant === "grid" &&
            "grid gap-6 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4",
          variant === "row" &&
            "flex items-stretch gap-6 overflow-x-scroll pb-7 [&>*]:w-96 [&>*]:shrink-0 [&>*]:grow-0 [&>*>p]:truncate",
          className
        )}
      >
        {(accounts || []).map((result, index) => {
          const record = result.record || result;
          //HACK: Make the page with rows load faster
          if (variant === "row" && index > 15) return null;
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
      {variant === "grid" && pagination}
    </>
  );
}
