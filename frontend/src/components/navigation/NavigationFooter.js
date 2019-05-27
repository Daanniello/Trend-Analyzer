import React from "react";
import "./NavigationFooter.css";
import * as axios from "axios";

import RequestService from "../../services/request-service";

import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const request = new RequestService();

const NavigationFooter = props => {
  const performAnalyzeRequest = async () => {
    axios.defaults.headers = { "x-api-key": "SOME_API_KEY" };
    const response = await request.post("/ping", {});
    alert(response);
  };

  return (
    <div id="navigation-footer">
      {/* <div id="navigation-footer-button">
      
    </div> */}
      <ButtonBase id="navigation-footer-button" onClick={performAnalyzeRequest}>
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
