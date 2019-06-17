import React from "react";
import "./SearchBar.css";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  textField: {
    "& fieldset": {
      borderRadius: 0,
      backgroundColor: "#fff"
    }
  }
};

const SearchBar = props => {
  return (
    <div className="searchbar">
      <TextField
        style={{ color: "White" }}
        onChange={props.onChange}
        label={"Search for a specific " + props.description}
        type="search"
        margin="normal"
        variant="outlined"
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
};

export default withStyles(styles)(SearchBar);
