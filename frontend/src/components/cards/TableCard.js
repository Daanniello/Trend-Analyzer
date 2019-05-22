import React from "react";
import "./TableCard.css";
import TableCardRow from "./TableCardRow";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

class TableCard extends React.Component {
  state = {};
  render() {
    return (
      <Typography variant="h2" className="table-card">
        <div className="table-header">
          <div className="table-row">
            <Typography className="table-row-title">Topic</Typography>
            <div className="table-row-seperate">
              <Typography className="table-row-all">All</Typography>
              <Typography className="table-row-yearly">Yearly</Typography>
              <Typography className="table-row-monthly">Monthly</Typography>
              <Typography className="table-row-weekly">Weekly</Typography>
              <Typography className="table-row-details">Details</Typography>
            </div>
          </div>
        </div>
        <TableCardRow
          title="Computers"
          all="230"
          yearly="130"
          monthly="50"
          weekly="20"
        />
        <TableCardRow
          title="Computers"
          all="230"
          yearly="130"
          monthly="50"
          weekly="20"
        />
        <TableCardRow
          title="Computers"
          all="230"
          yearly="130"
          monthly="50"
          weekly="20"
        />
      </Typography>
    );
  }
}

export default withStyles(styles)(TableCard);
