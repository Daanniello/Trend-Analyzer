import React from "react";
import "./TableCard.css";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const styles = {
  "& input": {
    width: 100
  }
};

class TableCardRow extends React.Component {
  state = {
    checkedA: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render(props) {
    return (
      <div className="table-row-content">
        <Checkbox
          className="checkbox"
          checked={this.state.checkedA}
          onChange={this.handleChange("checkedA")}
          value="checkedA"
        />
        <Typography className="table-row-title">{this.props.title}</Typography>
        <div className="table-row-seperate">
          <Typography className="table-row-all">{this.props.all}</Typography>
          <Typography className="table-row-yearly">
            {this.props.yearly}
          </Typography>
          <Typography className="table-row-monthly">
            {this.props.monthly}
          </Typography>
          <Typography className="table-row-weekly">
            {this.props.weekly}
          </Typography>
          <Typography className="table-row-details">
            {this.props.details}
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TableCardRow);
