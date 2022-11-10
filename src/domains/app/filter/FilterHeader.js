import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export function FilterHeader({ filter, as = "div", className, ...props }) {
  const Component = as;
  return (
    <Component
      {...props}
      className={clsx(
        "group flex flex-wrap items-center leading-snug",
        className
      )}
    >
      <h2 className="text-md mr-2 font-bold">{filter?.name}</h2>
      {props.to && (
        <ArrowLongRightIcon className="block h-4 pl-2 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100 lg:order-last" />
      )}
      <p className="opacity-80">{filter?.description}</p>
    </Component>
  );
}
