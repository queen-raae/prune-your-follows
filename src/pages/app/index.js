import React from "react";
import { Link } from "gatsby";

import useSiteMetadata from "../../domains/common/useSiteMetadata";
import { AppLayout } from "../../domains/app/AppLayout";
import { SearchForm } from "../../domains/app/search";
import { Header } from "../../domains/app/Header";
import { FilterResults, FOLLOWS_FILTERS } from "../../domains/app/filter";

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
        {FOLLOWS_FILTERS.map((filter) => {
          return (
            <section className="mb-8" key={filter.key}>
              <Header
                className="mb-6 leading-normal"
                as={Link}
                to={filter.path}
                {...filter}
              />

              <FilterResults
                filter={filter}
                variant="row"
                className="px4 -mr-4 lg:-mx-8 lg:px-8"
              />
            </section>
          );
        })}
      </AppLayout>
    </>
  );
}
