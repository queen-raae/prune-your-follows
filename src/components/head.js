import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const PageHead = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const siteTitle = data?.site?.siteMetadata?.title;
  const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle;

  return (
    <>
      <title>{pageTitle}</title>
    </>
  );
};

export default PageHead;
