import React from "react";
import "./TableCard.css";
import TableCardDetails from "./TableCardDetail";

import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

const TableCardRow = props => {
  const colorStyle = {};
  colorStyle.color = props.color;
  return (
    <div style={props.style} className="table-row-content">
      <Checkbox
        onClick={() => props.handleCheck(props.id)}
        checked={props.checked}
        style={colorStyle}
        className="checkbox"
      />
      <Typography className="table-row-title">{props.title}</Typography>
      <div className="table-row-seperate">
        <Typography className="table-row-all">{props.all}</Typography>
        <Typography className="table-row-yearly">{props.yearly}</Typography>
        <Typography className="table-row-monthly">{props.monthly}</Typography>
        <Typography className="table-row-weekly">{props.weekly}</Typography>
        <div className="table-row-details">
          <TableCardDetails color={colorStyle.color} details={props.details} />
        </div>
      </div>
    </div>
  );
};

export default TableCardRow;
