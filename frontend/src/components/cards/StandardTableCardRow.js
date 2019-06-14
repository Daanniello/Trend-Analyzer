import React from "react";
import "./StandardTableCard.css";
import { Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

class StanderdTableCardRow extends React.Component {
  state = {};
  render() {
    return (
      <div className="standard-table-card-rows">
        <Typography
          variant="h6"
          style={{
            float: "left",
            paddingLeft: "16px",
            paddingTop: "8px",
            fontWeight: 350
          }}
        >
          {this.props.text}
        </Typography>
        <Fab
          size="small"
          style={{
            float: "right",
            margin: "6px",
            width: "32px",
            height: "32px"
          }}
          aria-label="Delete"
          onClick={() => this.props.blacklist.removeItem(this.props.index)}
        >
          <DeleteIcon
            style={{
              width: "16px",
              height: "16px"
            }}
          />
        </Fab>
      </div>
    );
  }
}

export default StanderdTableCardRow;
