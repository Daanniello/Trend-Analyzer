import React from "react";

import TextField from "@material-ui/core/TextField";

function SimpleTextfield() {
  const handleChange = name => event => {};

  return (
    <TextField
      id="outlined-name"
      label="Add to blacklist"
      onChange={handleChange("name")}
      margin="none"
      variant="outlined"
      style={{ float: "left", marginRight: "16px" }}
    />
  );
}

export default SimpleTextfield;
