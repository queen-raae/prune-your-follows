import React from "react";

import useSiteMetadata from "../data/useSiteMetadata";
import usePopulateFollowing from "../data/usePopulateFollowing";
import useProfile from "../data/useProfile";

import { LogoutButton } from "../components/LogoutButton";
import { Header } from "../components/Header";
import { AccountTabs } from "../components/AccountTabs";
import { AppHero } from "../components/AppHero";
import { Footer } from "../components/Footer";
import { FetchingOverlay } from "../components/FetchingOverlay";

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
  usePopulateFollowing(); // Kickstart if needed
  const { data: profile } = useProfile();

  return (
    <>
      <FetchingOverlay open={Boolean(profile && !profile.last_fetched)} />
      <Header>
        <LogoutButton color="white" />
      </Header>
      <main>
        <AppHero />
        <AccountTabs />
      </main>
      <Footer />
    </>
  );
}
