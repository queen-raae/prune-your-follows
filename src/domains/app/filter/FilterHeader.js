import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

export function FilterHeader({ filter, as = "div", ...props }) {
  const Component = as;
  return (
    <Component {...props} className="group flex items-center">
      <h2 className="text-md inline font-bold">{filter.name}</h2>
      <p className="inline-block pl-2 align-baseline opacity-80">
        {filter.description}
        {props.to && (
          <ArrowLongRightIcon className="inline-block h-4 pl-2 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
        )}
      </p>
    </Component>
  );
}
