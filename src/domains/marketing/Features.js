import React from "react";
import XataLogo from "../common/xata-colored-with-text.svg";

import { FOLLOWS_FILTERS } from "../app/filter/useFilter";

import { useFathom } from "@raae/gatsby-plugin-fathom";

export function Features({ features = FOLLOWS_FILTERS }) {
  const { trackGoal, trackPageview } = useFathom;
  return (
    <section className="relative bg-green-50 pt-12 pb-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 py-0 lg:grid lg:grid-cols-5 lg:gap-x-24 lg:py-24 lg:px-8">
        <div className="mt-12 lg:col-span-2 lg:mt-0">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-green-600">
            Filters
          </h2>
          <p className="max-w-xs text-3xl font-bold tracking-tight text-stone-900">
            Prune your follows with ready-made filters
          </p>
          <p className="mt-6 max-w-xs text-base leading-7 text-stone-600">
            Filter the accounts you follow to find accounts to unfollow.
          </p>
        </div>

        <div className="mt-12 lg:col-span-3 lg:mt-0 lg:pl-10">
          <dl className="space-y-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <p className="text-md font-mono font-bold uppercase leading-6 text-green-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 max-w-xs text-base text-stone-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-0 lg:grid lg:grid-cols-5 lg:gap-x-24 lg:py-24 lg:px-8">
        <div className="mt-12 lg:col-span-2 lg:mt-0">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-green-600">
            Search
          </h2>
          <p className="max-w-xs text-3xl font-bold tracking-tight text-stone-900">
            Prune your follows with full-text search
          </p>
          <p className="mt-6 max-w-xs text-base leading-7 text-stone-600">
            Search username, name, description and location to find accounts to
            unfollow.
          </p>
        </div>

        <div className="mt-12 lg:col-span-3 lg:mt-0 lg:pl-10">
          <div className="space-y-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8">
            <aside>
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-green-900">
                Made by
              </h2>
              <a
                className="group mt-1.5 block max-w-xs"
                onClick={() =>
                  trackPageview({
                    url: "https://pruneyourfollows.com/",
                    referrer: "https://queen.raae.codes",
                  })
                }
              >
                <span className="block text-lg font-light leading-tight tracking-tight text-stone-600 transition group-hover:text-lime-800">
                  Queen{" "}
                  <span className="underline group-hover:no-underline">
                    @raae
                  </span>{" "}
                  👑
                  <br /> and her piratical family 🏴‍☠️
                </span>
              </a>
            </aside>
            <aside>
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-green-900">
                Powered by
              </h2>
              <a
                href="https://xata.io/?utm_campaign=prune+your+follows&utm_source=app&utm_medium=features"
                className="group mt-1.5 block max-w-xs text-lg font-semibold leading-snug tracking-tight text-stone-600 transition hover:text-lime-700"
              >
                <XataLogo className="h-12 w-32 transition group-hover:scale-105" />
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
