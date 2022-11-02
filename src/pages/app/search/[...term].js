import React from "react";

import useSiteMetadata from "../../../domains/common/useSiteMetadata";
import { AppLayout } from "../../../domains/app/AppLayout";
import { SearchForm, SearchResults } from "../../../domains/app/search";

export const Head = () => {
  const meta = useSiteMetadata();
  return (
    <>
      <title>{meta?.title} - app</title>
      <meta name="description" content={meta?.description} />
    </>
  );
};

export default function App(props) {
  const { term, location } = props;
  return (
    <>
      <AppLayout
        header={
          <SearchForm term={term} autoFocus={location.state?.searchAutoFocus} />
        }
      >
        <div className="p-8">
          <SearchResults term={term} />
        </div>
      </AppLayout>
    </>
  );
}
