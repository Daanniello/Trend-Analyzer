import React from "react";

import TextField from "@material-ui/core/TextField";

function OnChange(props, value) {
  let date = "";
  if (props.title === "Start Date") {
    date = document.getElementById("dateStart Date").value;
  }
  if (props.title === "End Date") {
    date = document.getElementById("dateEnd Date").value;
  }

  props.onChange(date);
}

function DatePickers(props) {
  return (
    <form>
      <TextField
        id={"date" + props.title}
        label={props.title}
        type="date"
        onChange={() => OnChange(props)}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
}

export default DatePickers;
