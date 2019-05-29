import React from "react";
import "./TableCard.css";
import TableCardDetails from "./TableCardDetail";

import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

const TableCardRow = props => {
  const colorStyle = {};
  colorStyle.color = props.color;
  return (
    <div className="table-row-content">
      <Typography>
        <Checkbox
          onClick={() => props.handleCheck(props.id)}
          checked={props.checked}
          style={colorStyle}
          className="checkbox"
        />
        <div className="table-row-title">{props.title}</div>
        <div className="table-row-seperate">
          <div className="table-row-all">{props.all}</div>
          <div className="table-row-yearly">{props.yearly}</div>
          <div className="table-row-monthly">{props.monthly}</div>
          <div className="table-row-weekly">{props.weekly}</div>
          <div className="table-row-details">
            <TableCardDetails
              color={colorStyle.color}
              details={props.details}
            />
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default TableCardRow;
