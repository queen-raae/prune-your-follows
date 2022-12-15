import React from "react";
import { StaticImage } from "gatsby-plugin-image";

import { LoginButton } from "../app/user";

export function Hero() {
  return (
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
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-orange-50">Let's prune</span>
              <span className="block text-lime-200">your follows!</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-center text-xl text-orange-50">
              Find Twitter accounts you follow that no longer spark joy,
              unfollow them and make room for new connections to grow 🌱
            </p>
            <div className="mx-auto mt-10 flex justify-center gap-4">
              <a
                href="https://www.producthunt.com/posts/prune-your-follows-a-twitter-tool?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-prune&#0045;your&#0045;follows&#0045;a&#0045;twitter&#0045;tool"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=371207&theme=dark"
                  alt="Prune&#0032;your&#0032;Follows&#0032;&#0045;&#0032;a&#0032;Twitter&#0032;tool - Does&#0032;your&#0032;Twitter&#0032;timeline&#0032;bring&#0032;you&#0032;joy&#0063; | Product Hunt"
                  width="250"
                  height="54"
                />
              </a>
              <LoginButton className="hover:bg-brand-50 flex items-center justify-center rounded-md border border-transparent bg-orange-50 px-4 py-3 text-base font-medium text-emerald-900 shadow-sm sm:px-8">
                Sign in with Twitter
              </LoginButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
