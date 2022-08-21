import React from "react";

import { SORT } from "../app/useFollowing";
import { Container } from "../common/Container";

export function Features() {
  return (
    <section
      id="features"
      aria-label="Features for finding accounts to unfollow"
      className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 pt-20 pb-28 sm:py-32"
    >
      <Container className="py-16 px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-24 lg:py-24 lg:px-8">
        <div className=" mt-12 lg:col-span-1 lg:mt-0">
          <p className="text-3xl font-bold tracking-tight text-white">
            Find Twitter accounts to unfollow with our ready-made categories
          </p>
        </div>

        <div className="mt-12 lg:col-span-2 lg:mt-0">
          <dl className="space-y-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <p className="text-md font-mono font-bold uppercase leading-6 text-white">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 text-base text-blue-100">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

const features = [
  {
    name: SORT.INACTIVE,
    description: "You follows with the lowest number of tweets per year",
  },
  {
    name: SORT.OVERACTIVE,
    description: "You follows with the highest number of tweets per year",
  },
  {
    name: SORT.UNPOPULAR,
    description: "You follows with the least number of followers",
  },
  {
    name: SORT.OVERPOPULAR,
    description: "You follows with the most number of followers",
  },
];
