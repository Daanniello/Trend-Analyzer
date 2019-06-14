import React, { Component } from "react";
import "./NavigationFooter.css";

import * as moment from "moment";

import RequestService from "../../services/request-service";

import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const request = new RequestService();

const NavigationFooter = props => {
  const performAnalyzeRequest = async () => {
    try {
      props.setDisableButton(moment().unix());
      const response = await request.post("/analyze", {});
      props.setTimestamp(response.data.lastUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="navigation-footer">
      <ButtonBase
        disabled={props.updateDisabled}
        id="navigation-footer-button"
        style={{
          backgroundColor: props.updateDisabled ? "darkgray" : "#8ec012"
        }}
        onClick={() => {
          performAnalyzeRequest();
        }}
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

export default NavigationFooter;
