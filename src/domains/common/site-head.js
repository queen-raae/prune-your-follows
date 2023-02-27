import React from "react";
import { useSiteMetadata } from "./useSiteMetadata";

export const siteHead = () => {
  const { url, socialImage, ...meta } = useSiteMetadata();
  return (
    <>
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
      <meta
        property="og:image"
        content={`${url}${socialImage?.gatsbyImageData.images?.fallback?.src}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content={`${url}${socialImage?.gatsbyImageData.images?.fallback?.src}`}
      />
    </>
  );
};
