import React from "react";
import "./TableCard.css";
import TableCardDetails from "./TableCardDetail";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const styles = {
  "& input": {
    width: 100
  },
  checkbox: {
    color: "aqua !important"
  }
};

class TableCardRow extends React.Component {
  state = {
    check: false, // this.props.index < 10 ? true : false
    color: "#551f5c"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  toggle = () => {
    const color = this.props.maintoggle(!this.state.check, this.state.color);
    if (!color) return;
    const state = this.state;
    state.check = !this.state.check;
    state.color = color;
    this.setState(state);
  };

  getRandomInt = max => {
    this.setState({ colorCounter: this.state.colorCounter + 1 });
    return this.state.colorCounter;
  };

  render() {
    return (
      <div className="table-row-content" style={this.props.style}>
        <Typography>
          <Checkbox
            Style={"color:" + this.state.color}
            className="checkbox"
            checked={this.state.check}
            onChange={this.handleChange("checkedA")}
            value="checkedA"
            onClick={this.toggle}
          />
          <div className="table-row-title">{this.props.title}</div>
          <div className="table-row-seperate">
            <div className="table-row-all">{this.props.all}</div>
            <div className="table-row-yearly">{this.props.yearly}</div>
            <div className="table-row-monthly">{this.props.monthly}</div>
            <div className="table-row-weekly">{this.props.weekly}</div>
            <div className="table-row-details">
              <TableCardDetails
                details={this.props.details}
                color={this.state.color}
              />
            </div>
          </div>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(TableCardRow);
