import React from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { CallToAction } from "../components/CallToAction";
import { LoginButton } from "../components/LoginButton";

import useSiteMetadata from "../data/useSiteMetadata";

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
