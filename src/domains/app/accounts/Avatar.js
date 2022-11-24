import clsx from "clsx";
import React from "react";

export function Avatar({ imageUrl, altText, className }) {
  return (
    <>
      {imageUrl ? (
        <img
          className={clsx("rounded-full border", className)}
          src={imageUrl}
          alt={altText}
        />
      ) : (
        <div className={clsx("rounded-full border", className)} />
      )}
    </>
  );
}
