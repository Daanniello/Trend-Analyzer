import React from "react";
import "./StandardTableCard.css";
import { Typography } from "@material-ui/core";
import StanderdTableCardRow from "./StandardTableCardRow";

class StandardTableCard extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  RemoveBlacklist() {}

  loadData() {
    let items = this.props.items;
    let andere = [];
    for (let i = 0; i < items.length; i++) {
      andere.push(
        <StanderdTableCardRow
          index={i}
          text={items[i]}
          blacklist={this.props.blacklist}
        />
      );
    }
    return andere;
  }

  render() {
    return (
      <div className="standard-table-card">
        <div className="standard-table-card-header">
          <Typography
            variant="h6"
            className=""
            style={{ paddingLeft: "12px", paddingTop: "12px", color: "White" }}
          >
            Name
          </Typography>
        </div>
        <div className="standard-table-card-collection">{this.loadData()}</div>
      </div>
    );
  }
}

export default StandardTableCard;
