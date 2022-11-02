import React from "react";
import { Link } from "gatsby";

import { Container } from "./Container";
import { Logo } from "../common/Logo";

export function Header({ children }) {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex items-center justify-between">
          <Logo as={Link} to="/" variant="mark" />
          <div className="flex items-center gap-x-5 md:gap-x-8">{children}</div>
        </nav>
      </Container>
    </header>
  );
}
