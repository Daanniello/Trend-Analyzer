import React from "react";
import "./NavigationFooter.css";

import RequestService from "../../services/request-service";

import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const request = new RequestService();

// Sends an API-key header as a request to analyze the trends
const NavigationFooter = props => {
  const performAnalyzeRequest = async () => {
    try {
      await request.post("/analyze", {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="navigation-footer">
      <ButtonBase
        id="navigation-footer-button"
        style={{ backgroundColor: "#8ec012" }}
        onClick={performAnalyzeRequest}
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
