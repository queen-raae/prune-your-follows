import React from "react";

import { LogoutButton } from "../domains/app/LogoutButton";

import useSiteMetadata from "../domains/common/useSiteMetadata";
import usePopulateFollowing from "../domains/app/usePopulateFollowing";
import useProfile from "../domains/app/useProfile";

import { Header } from "../domains/common/Header";
import { AccountTabs } from "../domains/app/AccountTabs";
import { Hero } from "../domains/app/Hero";
import { Footer } from "../domains/common/Footer";
import { FetchingOverlay } from "../domains/app/FetchingOverlay";
import { Hopscotch } from "../domains/app/Hopscotch";

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
      <Hopscotch />
      <FetchingOverlay open={Boolean(profile && !profile.last_fetched)} />
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
