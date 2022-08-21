import React from "react";

import { CallToAction } from "../components/CallToAction";
import { Faqs } from "../components/Faqs";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Pricing } from "../components/Pricing";
import { PrimaryFeatures } from "../components/PrimaryFeatures";
import { SecondaryFeatures } from "../components/SecondaryFeatures";
import { Testimonials } from "../components/Testimonials";

import useSiteMetadata from "../hooks/useSiteMetadata";

export const Head = () => {
  const meta = useSiteMetadata();
  return (
    <>
      <title>{meta?.site}</title>
      <meta name="description" content={meta?.description} />
    </>
  );
};

export default function Home() {
  return (
    <>
      <Header />
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
