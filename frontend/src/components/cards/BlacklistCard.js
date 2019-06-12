import React from "react";
import "./BlacklistCard.css";
import Typography from "@material-ui/core/Typography";
import SimpleTextField from "../fields/SimpleTextfield";
import AddButton from "../Buttons/AddButton";
import StandardTableCard from "./StandardTableCard";

class BlacklistCard extends React.Component {
  state = {
    items: ["WORK", "IN", "PROGRESS"]
  };
  constructor(props) {
    super(props);

    console.log(this.state);
  }

  removeItem = index => {
    const state = this.state;
    state.items.splice(index, 1);
    this.setState(state);
  };

  addItem = () => {
    const newItemElement = document.getElementById("outlined-name");
    if (newItemElement.value === "") return;
    const state = this.state;
    state.items.push(newItemElement.value);
    newItemElement.value = "";
    this.setState(state);
  };

  render() {
    return (
      <div className="blacklist-card">
        <Typography variant="h3" style={{ marginBottom: "16px" }}>
          Blacklist
        </Typography>
        <div className="inputfield">
          <SimpleTextField id="new-item-field" />
          <div style={{ paddingTop: "8px" }}>
            <AddButton blacklist={this} />
          </div>
        </div>
        <StandardTableCard blacklist={this} items={this.state.items} />
      </div>
    );
  }
}

export default BlacklistCard;
