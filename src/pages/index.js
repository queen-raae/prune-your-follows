import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

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
        <LoginButton className="group flex items-center">
          Go to app{" "}
          <ArrowLongRightIcon className="block h-4 pl-2 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100 md:order-last" />
        </LoginButton>
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
