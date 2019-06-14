import React from "react";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default function AddButton(props) {
  return (
    <div>
      <Fab
        size="small"
        onClick={() => props.blacklist.addItem()}
        aria-label="Add"
        color="default"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
