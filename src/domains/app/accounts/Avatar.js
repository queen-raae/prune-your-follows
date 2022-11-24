import clsx from "clsx";
import React, { useState } from "react";

export function Avatar({ imageUrl, altText, className }) {
  const [status, setStatus] = useState("loading");

  const handleOnLoad = () => {
    setStatus("fulfilled");
  };

  const handleOnError = () => {
    setStatus("failed");
  };

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-full border bg-slate-400",
        status === "loading" && "animate-pulse",
        className
      )}
    >
      <img
        className={clsx(
          status === "failed" && "hidden",
          !imageUrl && "hidden",
          "w-full"
        )}
        src={imageUrl}
        alt={altText}
        onLoad={handleOnLoad}
        onError={handleOnError}
      />
    </div>
  );

  // return (
  //   <>
  //     {imageUrl ? (
  //       <img
  //         className={clsx("rounded-full border", className)}
  //         src={imageUrl}
  //         alt={altText}
  //         onError={handleError}
  //       />
  //     ) : (
  //       <div className={clsx("rounded-full border", className)} />
  //     )}
  //   </>
  // );
}
