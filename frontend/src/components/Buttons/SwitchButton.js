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

    console.log(this.props.name);
    console.log(this.props.allowedProviders);
    if (this.props.allowedProviders.includes(this.props.name)) {
      const state = this.state;
      state.checked = true;
      this.setState(state);
    } else {
      const state = this.state;
      state.checked = false;
      this.setState(state);
    }
    console.log(this.state.checked);
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
  //   console.log(this.state.checked);
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
                console.log(`isChecked: ${!this.state.checked}`);
                this.props.switchHandler(this.props.name, !this.state.checked);
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
