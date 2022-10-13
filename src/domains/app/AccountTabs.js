import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "../common/Container";
import { AccountCard } from "./AccountCard";

import useFollowing, { SORT } from "./useFollowing";

export function AccountTabs() {
  const [sort, setSort] = useState(SORT.OVERPOPULAR);
  const { data: following } = useFollowing({
    sort: sort,
  });
  const selectedIndex = Object.keys(SORT).findIndex((key) => {
    return SORT[key] === sort;
  });

  const handleOnChange = (index) => {
    const key = Object.keys(SORT)[index];
    setSort(SORT[key]);
  };

  return (
    <section className="bg-slate-100">
      <Tab.Group
        onChange={handleOnChange}
        selectedIndex={selectedIndex}
        className="bg-white"
      >
        <Tab.List>
          <Container>
            {Object.keys(SORT).map((key) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  clsx(
                    selected
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "w-1/4 border-b-2 py-4 px-1 text-center font-mono text-sm font-medium uppercase"
                  )
                }
              >
                {SORT[key]}
              </Tab>
            ))}
          </Container>
        </Tab.List>
      </Tab.Group>

      <Container>
        <ul className="grid grid-cols-1 gap-6 pt-8 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {(following || []).map((account, index) => (
            <li key={account.id || index}>
              <AccountCard {...account} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
