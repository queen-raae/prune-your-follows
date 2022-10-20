import React from "react";

import { LogoutButton } from "../domains/app/LogoutButton";

import useSiteMetadata from "../domains/common/useSiteMetadata";

import { Header } from "../domains/common/Header";
import { AccountTabs } from "../domains/app/AccountTabs";
import { Hero } from "../domains/app/Hero";
import { Footer } from "../domains/common/Footer";

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
        <Hero />
        <AccountTabs />
      </main>
      <Footer />
    </>
  );
}
