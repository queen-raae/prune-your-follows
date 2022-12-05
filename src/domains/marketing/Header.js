import React from "react";
import { Link } from "gatsby";

import { Logo } from "../common/Logo";

export function Header({ children }) {
  return (
    <header className="mb-3 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex items-center justify-between">
          <Logo as={Link} to="/" variant="mark" />
          <div className="flex items-center gap-x-5 md:gap-x-8">{children}</div>
        </nav>
      </div>
    </header>
  );
}
