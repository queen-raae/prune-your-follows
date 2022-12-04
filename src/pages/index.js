import React from "react";

import { Footer } from "../domains/marketing/Footer";
import { Header } from "../domains/marketing/Header";
import { Hero } from "../domains/marketing/Hero";
import { Avatars } from "../domains/marketing/Avatars";
import { Features } from "../domains/marketing/Features";
import { CallToAction } from "../domains/marketing/CallToAction";

import { LoginButton } from "../domains/app/user";
import useSiteMetadata from "../domains/common/useSiteMetadata";

export const Head = () => {
  const meta = useSiteMetadata();
  return (
    <>
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
    </>
  );
};

export default function Home() {
  return (
    <>
      <Header>
        <LoginButton color="blue" />
      </Header>
      <main>
        <Hero />
        <Avatars />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
