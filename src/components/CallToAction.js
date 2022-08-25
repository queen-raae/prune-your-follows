import React from "react";

import { LoginButton } from "./LoginButton";
import { Container } from "./Container";

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-slate-100 py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Get started today
          </h2>
          <LoginButton className="mt-10">Sign in with Twitter</LoginButton>
        </div>
      </Container>
    </section>
  );
}
