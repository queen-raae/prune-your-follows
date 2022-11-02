import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export function Avatars({ children }) {
  const data = useStaticQuery(graphql`
    query {
      allUserAvatar {
        nodes {
          username
          localImage {
            childImageSharp {
              gatsbyImageData(width: 32, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `);

  if (data.allUserAvatar.nodes.length === 0) return null;

  return (
    <>
      {children}
      <div className="flex justify-center -space-x-1 overflow-hidden">
        {data.allUserAvatar.nodes.map((user) => {
          const image = getImage(user.localImage);
          return (
            <GatsbyImage
              key={user.username}
              className="inline-block h-8 w-8 rounded-full bg-blue-200 ring-2 ring-white"
              image={image}
              alt={user.username}
            />
          );
        })}
      </div>
    </>
  );
}
