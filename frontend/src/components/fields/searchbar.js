import React from "react";
import "./SearchBar.css";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";

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
    <Typography className="searchbar">
      <TextField
        Style="color:White"
        onChange={props.onChange}
        label="Search for a specific topic"
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
    </Typography>
  );
};

export default withStyles(styles)(SearchBar);
