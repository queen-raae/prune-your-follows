import React from "react";

import { Footer } from "../domains/common/Footer";
import { Header } from "../domains/common/Header";
import { Hero } from "../domains/marketing/Hero";
import { Features } from "../domains/marketing/Features";
import { CallToAction } from "../domains/marketing/CallToAction";
import { LoginButton } from "../domains/app/LoginButton";

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
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}