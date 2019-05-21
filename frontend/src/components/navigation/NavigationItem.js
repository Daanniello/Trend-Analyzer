import React from "react";
import "./NavigationItem.css";
import { Typography } from "@material-ui/core";

const NavigationItem = props => {
  return (
    <div
      className={"navigation-item" + (props.active ? " active" : " inactive")}
    >
      <div className="navigation-item-logo">{props.icon}</div>
      <div className="navigation-item-text">
        <Typography variant="body1">{props.text}</Typography>
      </div>
    </div>
  );
};

export default NavigationItem;
