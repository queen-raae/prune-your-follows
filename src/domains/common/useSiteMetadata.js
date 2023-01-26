import { useStaticQuery, graphql } from "gatsby";

const useSiteMetadata = () => {
  const { site, file } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          tagline
          url
        }
      }
      file(name: { eq: "og-image" }) {
        socialImage: childImageSharp {
          gatsbyImageData(width: 1200, height: 627)
        }
      }
    }
  `);

  return {
    ...site?.siteMetadata,
    ...file,
  };
};

export default useSiteMetadata;
