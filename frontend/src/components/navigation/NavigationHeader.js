import React from "react";
import "./NavigationHeader.css";

import Typography from "@material-ui/core/Typography";

const NavigationHeader = props => {
  return (
    <div id="navigation-header">
      <img
        id="logo"
        src="https://www.kjenning.nl/images/logos/kjenning-header-logo.png"
      />
    </div>
  );
};

export default NavigationHeader;
