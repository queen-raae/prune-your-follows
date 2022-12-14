import { Link } from "gatsby";
import React from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

import { AccountList } from "../accounts";
import useFilter from "./useFilter";

export function FilterResults(props) {
  const { filter, pageIndex } = props;
  const { data, isPreviousData, isPlaceholderData } = useFilter({
    filter: filter,
    pageIndex: pageIndex,
  });

  const hasPrevious = pageIndex > 0;
  const hasNext = data.meta?.page?.more;
  const hasPagination = hasPrevious || hasNext;

  return (
    <AccountList
      accounts={data.records}
      disabled={isPreviousData || isPlaceholderData}
      {...props}
      pagination={
        hasPagination && (
          <nav className="mt-6 flex items-center justify-between border-t border-green-100 px-4 sm:px-0">
            <div className="-mt-px flex w-0 flex-1">
              {hasPrevious && (
                <Link
                  to={pageIndex > 1 ? `../${pageIndex - 1}` : `..`}
                  className="group inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-stone-500 hover:border-lime-600 hover:text-stone-700"
                >
                  <ArrowLongLeftIcon
                    className="mr-3 h-5 w-5 text-green-700 transition group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  Previous
                </Link>
              )}
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
              {hasNext && (
                <Link
                  to={pageIndex > 0 ? `../${pageIndex + 1}` : `1`}
                  className="group inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-stone-500 hover:border-lime-600 hover:text-stone-700"
                >
                  Next
                  <ArrowLongRightIcon
                    className="ml-2 h-5 w-5 text-green-700 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </nav>
        )
      }
    />
  );
}
