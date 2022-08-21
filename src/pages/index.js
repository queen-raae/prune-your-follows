import React from "react";

import { CallToAction } from "../domains/marketing/CallToAction";
import { Faqs } from "../domains/marketing//Faqs";
import { Footer } from "../domains/marketing/Footer";
import { Header } from "../domains/marketing/Header";
import { Hero } from "../domains/marketing/Hero";
import { LoginButton } from "../domains/app/LoginButton";
import { Pricing } from "../domains/marketing/Pricing";
import { PrimaryFeatures } from "../domains/marketing/PrimaryFeatures";
import { SecondaryFeatures } from "../domains/marketing/SecondaryFeatures";
import { Testimonials } from "../domains/marketing/Testimonials";

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
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
