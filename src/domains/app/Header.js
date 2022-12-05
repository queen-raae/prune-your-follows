import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export function Header(props) {
  const { as = "div", className } = props;
  const { name, description, to } = props;
  const Component = as;
  return (
    <Component
      {...props}
      className={clsx(
        "group flex flex-wrap items-center leading-snug md:flex-nowrap",
        className
      )}
    >
      <h2 className="text-md mr-2 font-bold text-green-800">{name}</h2>
      {to && (
        <ArrowLongRightIcon className="block h-4 pl-2 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100 md:order-last" />
      )}
      <p className="basis-full text-stone-600 md:basis-auto">{description}</p>
    </Component>
  );
}
