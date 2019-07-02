import React, { Component } from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class SwitchButtonStandard extends Component {
  state = {
    checked: false
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.emailOnly
    };
  }

  // handleChange = () => {
  //   const state = this.state;

  //   if (this.state.checked) {
  //     state.checked = false;
  //     this.props.switchHandler(this.props.name, false);
  //   } else {
  //     state.checked = true;
  //     this.props.switchHandler(this.props.name, true);
  //   }
  //   this.setState(state);
  // };

  render() {
    return (
      <FormGroup style={{}}>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checked}
              onChange={() => {
                this.setState({ checked: !this.state.checked });
                this.props.switchHandler();
              }}
              value="checkedA"
              style={{ float: "left", color: this.props.color }}
            />
          }
          label={this.props.name}
        />
      </FormGroup>
    );
  }
}

export default SwitchButtonStandard;
