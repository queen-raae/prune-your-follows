import React from "react";

export function FilterHeader({ filter }) {
  return (
    <div>
      <h2 className="text-md inline pl-8 font-bold">{filter.name}</h2>
      <p className="inline pl-2 opacity-80">{filter.description}</p>
    </div>
  );
}
