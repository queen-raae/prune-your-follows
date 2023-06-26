import React from "react";
import { StaticImage } from "gatsby-plugin-image";

import { EnvelopeIcon } from "@heroicons/react/20/solid";

export function Hero() {
  return (
    <>
      <header className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-green-100" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative border-4 border-lime-600 shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <StaticImage
                src="./prune.png"
                aria-hidden="true"
                layout="fullWidth"
                className="h-full bg-lime-800"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-r from-lime-600 to-lime-900 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 pb-8 sm:px-6 sm:py-24 lg:py-32 lg:py-16 lg:px-8">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-orange-50">Let's prune</span>
                <span className="block text-lime-200">your follows!</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-center text-xl text-orange-50">
                Find Twitter accounts you follow that no longer spark joy,
                unfollow them and make room for new connections to grow 🌱
              </p>
            </div>
          </div>
        </div>
      </header>
      <section className="bg-green-100 pt-10 pb-16">
        <p className="mx-auto mt-6 max-w-xl text-center text-xl">
          The new Twitter API changes has rendered the current version useless.
          We are working on a new approach!
        </p>
        <p className="mx-auto mt-6 max-w-xl text-center text-xl">
          <a
            href="https://forms.userlist.com/0e1abbbf-73fe-48cf-b5de-8dc7828b54b0"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-x-1.5 rounded-md border border-transparent bg-green-700 px-4 py-3 text-base font-medium text-white text-emerald-900 shadow-sm hover:bg-orange-50 sm:px-8"
          >
            Get notfied when we're back
            <EnvelopeIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
          </a>
        </p>
      </section>
    </>
  );
}
