import clsx from "clsx";
import React from "react";
import LogoMark from "./icons8-cut.svg";

export function Logo({ variant = "full", as = "div", ...props }) {
  const Component = as;
  return (
    <Component
      {...props}
      className={clsx("flex items-center", props.className)}
    >
      <LogoMark />
      <h1
        className={clsx(
          "text-md pl-3 font-bold",
          variant === "mark" && "sr-only"
        )}
      >
        Prune your Follows
      </h1>
    </Component>
  );
}
