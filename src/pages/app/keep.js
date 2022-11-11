import React from "react";

import useSiteMetadata from "../../domains/common/useSiteMetadata";
import { AppLayout } from "../../domains/app/AppLayout";
import {
  FilterResults,
  FilterHeader,
  getFilter,
} from "../../domains/app/filter";

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
      <AppLayout header={<FilterHeader filter={filter} />}>
        <FilterResults filter={filter} />
      </AppLayout>
    </>
  );
}
