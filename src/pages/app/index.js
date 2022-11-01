import React from "react";

import useSiteMetadata from "../../domains/common/useSiteMetadata";
import { AppLayout } from "../../domains/app/AppLayout";
import { AppSidebar } from "../../domains/app/AppSidebar";

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
      <AppLayout>
        <main></main>
      </AppLayout>
    </>
  );
}
