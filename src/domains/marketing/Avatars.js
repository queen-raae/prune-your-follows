import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export function Avatars() {
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
    <section className="relative bg-green-100 py-6">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-lime-800">
          Trusted by these amazing folks and more so far:
        </h2>
      </div>

      <ul className="flex justify-center -space-x-1 overflow-hidden py-6">
        {data.allUserAvatar.nodes.map((user) => {
          const image = getImage(user.localImage);
          return (
            <li className="shrink-0" key={user.username}>
              <GatsbyImage
                key={user.username}
                className="h-10 w-10 rounded-full ring-2 ring-orange-50"
                image={image}
                alt={user.username}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
