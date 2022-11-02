import React from "react";
import { AccountCard } from "./AccountCard";

export function AccountList({ accounts }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
