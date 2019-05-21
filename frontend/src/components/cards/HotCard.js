import React from "react";
import "./HotCard.css";

import Typography from "@material-ui/core/Typography";
import Whatshot from "@material-ui/icons/Whatshot";

const HotCard = props => {
  return (
    <div className={"hot-card" + (props.top ? " hot-card-top" : "")}>
      <div className="hot-card-header">
        <div
          className="hot-card-header-icon"
          style={{ color: props.iconColor }}
        >
          <Whatshot fontSize="inherit" />
        </div>
        <div className="hot-card-header-text">
          <Typography variant="h4">{props.type}</Typography>
        </div>
      </div>
      <div className="hot-card-content">
        <Typography className="hot-card-content-text" variant="h5">
          {props.text}
        </Typography>
      </div>
      <div className="hot-card-footer">
        <Typography
          className="hot-card-footer-text"
          align="center"
          variant="overline"
        >
          {props.results} results this week
        </Typography>
      </div>
    </div>
  );
};

export default HotCard;
