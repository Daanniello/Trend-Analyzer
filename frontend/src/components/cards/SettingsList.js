import React from "react";
import "./SettingsList.css";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

const TitleStyle = {
  width: "100%",
  overflow: "hidden",
  float: "left",
  marginBottom: "16px"
};

const ButtonStyle = {
  margin: "8px 16px"
};

const TableStyle = {
  width: "100%",
  marginTop: "16px",
  boxShadow:
    "0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)"
};

const TableHeaderStyle = {
  width: "calc(100% - 24px)",
  height: "32px",
  backgroundColor: "#9D000F",
  padding: "8px 8px 8px 16px"
};

const TableContentStyle = {
  width: "100%",
  height: "144px",
  overflowY: "scroll"
};

const TableRowStyle = {
  width: "calc(100% - 24px)",
  height: "32px",
  padding: "8px 8px 8px 16px"
};

class SettingsList extends React.Component {
  state = {};
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      items: props.items
    };
  }

  addItem = () => {
    const inputElement = document.getElementById(
      `input-field-${this.props.title}`
    );
    const value = inputElement.value;
    if (!value) return;
    if (value === "") return;
    const state = this.state;
    state.items.unshift(value);
    inputElement.value = "";
    this.setState(state);

    this.props.onItemsChanged(state.items);
  };

  removeItem = index => {
    const state = this.state;
    state.items.splice(index, 1);
    this.setState(state);

    this.props.onItemsChanged(state.items);
  };

  row = (item, index) => (
    <div key={`item-${index}`} style={TableRowStyle}>
      <Typography
        variant="h6"
        style={{
          fontWeight: "normal",
          float: "left",
          width: "calc(100% - 32px)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {item}
      </Typography>
      <DeleteIcon
        onClick={() => this.removeItem(index)}
        style={{
          width: "28px",
          height: "28px",
          padding: "2px",
          color: "rgba(0, 0, 0, 0.27)",
          float: "left"
        }}
      />
    </div>
  );

  render() {
    return (
      <div className="settings-list">
        <Typography style={TitleStyle} variant="h5">
          {this.props.title}
        </Typography>
        <TextField
          id={`input-field-${this.props.title}`}
          label={`Add to ${this.props.title}`}
          margin="none"
          variant="outlined"
        />
        <Fab
          size="small"
          style={ButtonStyle}
          onClick={() => this.addItem()}
          aria-label="Add"
          color="default"
        >
          <AddIcon />
        </Fab>
        <div style={TableStyle}>
          <div style={TableHeaderStyle}>
            <Typography style={{ color: "white" }} variant="h6">
              Item
            </Typography>
          </div>
          <div style={TableContentStyle}>{this.state.items.map(this.row)}</div>
        </div>
      </div>
    );
  }
}

export default SettingsList;
