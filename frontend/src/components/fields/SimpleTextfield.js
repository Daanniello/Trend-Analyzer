import React from "react";

import TextField from "@material-ui/core/TextField";

function SimpleTextfield(props) {
  return (
    <TextField
      id="outlined-name"
      label={props.placeholder}
      onChange={props.onInput}
      margin="none"
      variant="outlined"
      style={{ float: "left", marginRight: "16px" }}
    />
  );
}

export default SimpleTextfield;
