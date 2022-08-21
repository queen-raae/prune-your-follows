import React from "react";
import Root from "./src/domains/Root";

export const wrapRootElement = ({ element }) => {
  return <Root>{element}</Root>;
};

export const onRenderBody = ({ setHtmlAttributes, setBodyAttributes }) => {
  setHtmlAttributes({
    className:
      "h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']",
  });
  setBodyAttributes({ className: "flex h-full flex-col" });
};
