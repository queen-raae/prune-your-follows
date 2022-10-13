import React from "react";
import { Script } from "gatsby";

export function Hopscotch() {
  return (
    <Script
      id="hopscotch-script"
      type="text/javascript"
    >{`(function (w, d) {if (typeof w === "undefined") return;w.Hopscotch = w.Hopscotch || function () {(w.Hopscotch.q = w.Hopscotch.q || []).push(arguments);};var elm = d.createElement("div");elm.setAttribute("data-widget-host", "hopscotch");elm.setAttribute("data-props-api-key", "39311cf6-d7b7-4e00-b8e7-e8477d46e39f");d.getElementsByTagName("body")[0].appendChild(elm);var s = d.createElement("script");s.src = "https://widgets.hopscotch.club/v1/widget.js?";s.async = 1;s.defer = 1;d.getElementsByTagName("body")[0].appendChild(s);  })(window, document);`}</Script>
  );
}
