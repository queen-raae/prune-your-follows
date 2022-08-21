import React from "react";

import { LogoutButton } from "../domains/app/LogoutButton";

import useSiteMetadata from "../domains/common/useSiteMetadata";
import usePopulateFollowing from "../domains/app/usePopulateFollowing";
import { Header } from "../domains/marketing/Header";
import { AccountTabs } from "../domains/app/AccountTabs";
import { Hero } from "../domains/app/Hero";
import { Footer } from "../domains/marketing/Footer";

export const Head = () => {
  const meta = useSiteMetadata();
  return (
    <>
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
    </>
  );
};

export default function App() {
  usePopulateFollowing(); // Kickstart if needed

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
