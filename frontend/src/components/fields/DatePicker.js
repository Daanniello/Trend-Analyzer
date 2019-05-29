import React from "react";

import TextField from "@material-ui/core/TextField";

function DatePickers(props) {
  return (
    <form noValidate>
      <TextField
        id="date"
        label={props.title}
        type="date"
        defaultValue="2019-05-05"
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
}

export default DatePickers;
