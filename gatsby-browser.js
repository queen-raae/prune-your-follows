import React from "react";
import Root from "./src/components/root";

export const wrapRootElement = ({ element }) => {
  return <Root>{element}</Root>;
};
