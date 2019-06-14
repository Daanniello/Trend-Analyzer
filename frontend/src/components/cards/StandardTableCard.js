import React from "react";
import "./StandardTableCard.css";
import { Typography } from "@material-ui/core";
import StanderdTableCardRow from "./StandardTableCardRow";

class StandardTableCard extends React.Component {
  RemoveBlacklist() {}

  loadData() {
    let items = this.props.items;
    let other = [];
    for (let i = 0; i < items.length; i++) {
      other.push(
        <StanderdTableCardRow
          key={i}
          index={i}
          text={items[i]}
          blacklist={this.props.blacklist}
        />
      );
    }
    return other;
  }

  render() {
    return (
      <div className="standard-table-card">
        <div className="standard-table-card-header">
          <Typography
            variant="h6"
            className=""
            style={{ paddingLeft: "16px", paddingTop: "8px", color: "White" }}
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
