import React from "react";
import "./StandardTableCard.css";
import { Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

class StanderdTableCardRow extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {};
  render() {
    return (
      <div className="standard-table-card-rows">
        <Typography
          variant="h6"
          style={{ float: "left", marginTop: "12px", marginLeft: "12px" }}
        >
          {this.props.text}
        </Typography>
        <Fab
          size="small"
          style={{ float: "right", margin: "8px" }}
          aria-label="Delete"
          onClick={() => this.props.blacklist.removeItem(this.props.index)}
        >
          <DeleteIcon />
        </Fab>
      </div>
    );
  }
}

export default StanderdTableCardRow;
