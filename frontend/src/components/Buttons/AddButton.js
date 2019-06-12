import React from "react";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default function AddButton(props) {
  return (
    <div>
      <Fab
        size="small"
        color="primary"
        onClick={() => props.blacklist.addItem()}
        aria-label="Add"
        color="#8ec012"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
