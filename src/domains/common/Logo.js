import clsx from "clsx";
import React from "react";

export function Logo({ variant = "full", as = "div", ...props }) {
  const Component = as;
  return (
    <Component
      {...props}
      className={clsx("flex items-center", props.className)}
    >
      <span className="text-3xl">⚔️</span>
      <h1 className={clsx("pl-3 font-bold", variant === "mark" && "sr-only")}>
        Prune your Follows
      </h1>
    </Component>
  );
}
