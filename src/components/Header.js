import React from "react";
import { Link } from "gatsby";

import { Container } from "./Container";
import { Logo } from "./Logo";

export function Header({ children }) {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link to="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">{children}</div>
        </nav>
      </Container>
    </header>
  );
}
