import clsx from "clsx";
import React from "react";
import LogoMark from "./icons8-cut.svg";

export function Logo({ variant = "full", as = "div", ...props }) {
  const Component = as;
  return (
    <Component
      {...props}
      className={clsx("flex items-center rounded-md", props.className)}
    >
      <LogoMark />
      <h1
        className={clsx(
          "text-md -m-3 pl-3 pr-6 font-bold text-green-800",
          variant === "mark" && "sr-only"
        )}
      >
        Prune your Follows
      </h1>
    </Component>
  );
}
