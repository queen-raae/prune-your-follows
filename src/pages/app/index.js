import React from "react";

import useSiteMetadata from "../../domains/common/useSiteMetadata";
import { AppLayout } from "../../domains/app/AppLayout";
import { SearchForm } from "../../domains/app/search";

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
  const { location } = props;
  return (
    <>
      <AppLayout
        header={<SearchForm autoFocus={location.state?.searchAutoFocus} />}
      >
        HOME
      </AppLayout>
    </>
  );
}
