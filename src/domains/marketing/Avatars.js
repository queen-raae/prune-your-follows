import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export function Avatars() {
  const data = useStaticQuery(graphql`
    query {
      allAvatar {
        nodes {
          username
          avatarUrl
        }
      }
    }
  `);

  console.log(data);

  return (
    <div className="flex justify-center -space-x-1 overflow-hidden">
      {data.allAvatar.nodes.map((user) => {
        return (
          <img
            key={user.username}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={user.avatarUrl}
            alt={user.username}
          />
        );
      })}
    </div>
  );
}
