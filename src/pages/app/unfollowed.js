import React from "react";

import useSiteMetadata from "../../domains/common/useSiteMetadata";
import { AppLayout } from "../../domains/app/AppLayout";
import { Header } from "../../domains/app/Header";
import { FilterResults, getFilter } from "../../domains/app/filter";

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
  const filter = getFilter({ path: location.pathname });

  return (
    <>
      <AppLayout header={<Header {...filter} />}>
        <FilterResults filter={filter} />
      </AppLayout>
    </>
  );
}
