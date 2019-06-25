import React, { Component } from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class SwitchButton extends Component {
  state = {
    checked: false
  };

  constructor(props) {
    super(props);

    const state = this.state;
    state.checked = this.props.allowedProviders.indexOf(this.props.name) >= 0;
    this.setState(state);
  }

  render() {
    return (
      <FormGroup style={{}}>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checked}
              onChange={() => {
                this.setState({ checked: !this.state.checked });
                this.props.switchHandler(this.props.name);
              }}
              style={{
                float: "left",
                color: this.props.color
              }}
            />
          }
          label={this.props.name}
        />
      </FormGroup>
    );
  }
}

export default SwitchButton;
