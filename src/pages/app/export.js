import React from "react";

import useSiteMetadata from "../../domains/common/useSiteMetadata";
import { AppLayout } from "../../domains/app/AppLayout";
import { ExportButton, EXPORT_NAV_ITEM } from "../../domains/app/export";
import { Header } from "../../domains/app/Header";

export const Head = () => {
  const meta = useSiteMetadata();
  return (
    <>
      <title>{meta?.title} - app</title>
      <meta name="description" content={meta?.description} />
    </>
  );
};

export default function App() {
  return (
    <>
      <AppLayout header={<Header {...EXPORT_NAV_ITEM} />}>
        <ExportButton />
      </AppLayout>
    </>
  );
}
