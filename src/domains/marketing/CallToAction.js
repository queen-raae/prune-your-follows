import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { LoginButton } from "../app/user";

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-lime-700"
    >
      <div className="relative shadow-xl sm:overflow-hidden">
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
          <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-orange-50">Get started today!</span>
          </h2>

          <div className="mx-auto mt-10 flex justify-center">
            <LoginButton className="hover:bg-brand-50 flex items-center justify-center rounded-md border border-transparent bg-orange-50 px-4 py-3 text-base font-medium text-emerald-900 shadow-sm sm:px-8">
              Sign in with Twitter
            </LoginButton>
          </div>
        </div>
      </div>
    </section>
  );
}
