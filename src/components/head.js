import React from "react";
import useSiteMetadata from "../hooks/useSiteMetadata";

const PageHead = ({ title }) => {
  const siteMetadata = useSiteMetadata();
  const siteTitle = siteMetadata?.title;
  const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle;

  return (
    <>
      <title>{pageTitle}</title>
    </>
  );
};

export default PageHead;
