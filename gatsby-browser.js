import React from "react";
import Root from "./src/domains/Root";

export const wrapRootElement = ({ element }) => {
  return <Root>{element}</Root>;
};
