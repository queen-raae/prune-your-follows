import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export function FilterHeader({ filter, as = "div", className, ...props }) {
  const Component = as;
  return (
    <Component
      {...props}
      className={clsx(
        "group block items-center leading-snug sm:flex",
        className
      )}
    >
      <h2 className="text-md mr-2 font-bold">{filter?.name}</h2>
      <p className="align-baseline opacity-80">
        {filter?.description}
        {props.to && (
          <ArrowLongRightIcon className="inline-block h-4 pl-2 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
        )}
      </p>
    </Component>
  );
}
