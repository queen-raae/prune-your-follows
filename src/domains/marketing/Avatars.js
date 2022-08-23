import React from "react";
import useUsers from "../app/useUsers";

export function Avatars() {
  const { data: users } = useUsers();

  return (
    <div className="flex justify-center -space-x-1 overflow-hidden">
      {users.map((user, index) => {
        return (
          <img
            key={user.username || index}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={user.avatar_url}
            alt={user.username}
          />
        );
      })}
    </div>
  );
}
