import React from "react";

import { Footer } from "../domains/marketing/Footer";
import { Header } from "../domains/marketing/Header";
import { Hero } from "../domains/marketing/Hero";
import { Avatars } from "../domains/marketing/Avatars";
import { Features } from "../domains/marketing/Features";
import { Newsletter } from "../domains/marketing/Newsletter";
import { CallToAction } from "../domains/marketing/CallToAction";

import useSiteMetadata from "../domains/common/useSiteMetadata";
import { UsageData } from "../domains/marketing/UsageData";

export const Head = () => {
  const { url, socialImage, ...meta } = useSiteMetadata();
  return (
    <>
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
      <meta
        property="og:image"
        content={`${url}${socialImage?.gatsbyImageData.images?.fallback?.src}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content={`${url}${socialImage?.gatsbyImageData.images?.fallback?.src}`}
      />
    </>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Avatars />
        <UsageData />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
