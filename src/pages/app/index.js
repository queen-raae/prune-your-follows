import React from "react";
import { Link } from "gatsby";

import useSiteMetadata from "../../domains/common/useSiteMetadata";
import { AppLayout } from "../../domains/app/AppLayout";
import { SearchForm } from "../../domains/app/search";
import { FilterHeader, FilterResults, FILTERS } from "../../domains/app/filter";

export const Head = () => {
  const meta = useSiteMetadata();
  return (
    <>
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
    </>
  );
};

export default function App(props) {
  const { location } = props;
  return (
    <>
      <AppLayout
        header={<SearchForm autoFocus={location.state?.searchAutoFocus} />}
      >
        {FILTERS.map((filter) => {
          return (
            <section className="mb-8 [&>:first-child]:mb-6">
              <FilterHeader as={Link} to={filter.to} filter={filter} />

              <FilterResults
                filter={filter}
                variant="row"
                className="px4 -mx-4 lg:-mx-8 lg:px-8"
              />
            </section>
          );
        })}
      </AppLayout>
    </>
  );
}
