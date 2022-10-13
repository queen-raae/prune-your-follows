import React from "react";
import { Script } from "gatsby";

import { LogoutButton } from "../domains/app/LogoutButton";

import useSiteMetadata from "../domains/common/useSiteMetadata";
import usePopulateFollowing from "../domains/app/usePopulateFollowing";
import useProfile from "../domains/app/useProfile";

import { Header } from "../domains/common/Header";
import { AccountTabs } from "../domains/app/AccountTabs";
import { Hero } from "../domains/app/Hero";
import { Footer } from "../domains/common/Footer";
import { FetchingOverlay } from "../domains/app/FetchingOverlay";

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
      <Script
        id="hopscotch-script"
        type="text/javascript"
      >{`(function (w, d) {if (typeof w === "undefined") return;w.Hopscotch = w.Hopscotch || function () {(w.Hopscotch.q = w.Hopscotch.q || []).push(arguments);};var elm = d.createElement("div");elm.setAttribute("data-widget-host", "hopscotch");elm.setAttribute("data-props-api-key", "39311cf6-d7b7-4e00-b8e7-e8477d46e39f");d.getElementsByTagName("body")[0].appendChild(elm);var s = d.createElement("script");s.src = "https://widgets.hopscotch.club/v1/widget.js?";s.async = 1;s.defer = 1;d.getElementsByTagName("body")[0].appendChild(s);  })(window, document);`}</Script>

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
