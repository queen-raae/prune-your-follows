import clsx from "clsx";
import React, { useState } from "react";

export function Avatar({ imageUrl, altText, className, name = "" }) {
  const [status, setStatus] = useState("loading");
  let initials = name
    .split(" ")
    .map((word) => Array.from(word).slice(0, 1))
    .slice(0, 2)
    .join("");

  const handleOnLoad = () => {
    setStatus("fulfilled");
  };

  const handleOnError = () => {
    setStatus("failed");
  };

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-full border border-green-700 bg-green-700",
        "flex items-center justify-center",
        status === "loading" ? "animate-pulse" : "",
        className
      )}
    >
      <img
        className={clsx(
          status === "fulfilled" ? "visible" : "hidden",
          "h-full w-full"
        )}
        src={imageUrl}
        alt={altText}
        onLoad={handleOnLoad}
        onError={handleOnError}
      />
      <span
        aria-hidden={true}
        className={clsx(
          status === "failed" ? "visible" : "hidden",
          "text-green-100"
        )}
      >
        {initials}
      </span>
    </div>
  );
}
