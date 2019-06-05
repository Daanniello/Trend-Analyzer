import React from "react";
import "./NavigationFooter.css";

import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const NavigationFooter = props => {
  return (
    <div id="navigation-footer">
      <ButtonBase
        style={{ backgroundColor: "#FF8000" }}
        id="navigation-footer-button"
      >
        Update
      </ButtonBase>

      <div id="navigation-footer-timestamp">
        <Typography
          className="navigation-footer-timestamp-text"
          variant="body1"
        >
          Last updated on
        </Typography>
        <Typography
          className="navigation-footer-timestamp-text"
          variant="body1"
        >
          {props.lastUpdated}
        </Typography>
      </div>
    </div>
  );
};
//  + props.timeStamp
export default NavigationFooter;
