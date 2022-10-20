import React from "react";

import { LogoutButton } from "../domains/app/LogoutButton";

import useSiteMetadata from "../domains/common/useSiteMetadata";

import { Header } from "../domains/common/Header";
import { Footer } from "../domains/common/Footer";
import Search from "../domains/app/Search";

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
      <Header>
        <LogoutButton color="white" />
      </Header>
      <main>
        <Search />
      </main>
      <Footer />
    </>
  );
}
