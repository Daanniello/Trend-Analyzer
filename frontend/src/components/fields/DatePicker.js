import React from "react";

import TextField from "@material-ui/core/TextField";
import * as moment from "moment";

function DatePickers(props) {
  function setDefaultDate() {
    const date = moment().startOf("day");
    if (props.title === "Start Date") {
      date.subtract(3, "month");
    }

    const formattedDate = date.format("YYYY-MM-DD");
    return formattedDate;
  }

  return (
    <form>
      <TextField
        id={"date" + props.title}
        label={props.title}
        type="date"
        defaultValue={setDefaultDate()}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
}

export default DatePickers;
