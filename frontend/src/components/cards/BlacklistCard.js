import React from "react";
import "./BlacklistCard.css";
import Typography from "@material-ui/core/Typography";
import SimpleTextField from "../fields/SimpleTextfield";
import AddButton from "../Buttons/AddButton";
import StandardTableCard from "./StandardTableCard";
import RequestService from "../../services/request-service";

const request = new RequestService();

class BlacklistCard extends React.Component {
  state = {
    items: []
  };
  constructor(props) {
    super(props);

    this.state.items = this.props.items;
  }

  removeItem = index => {
    const state = this.state;
    state.items.splice(index, 1);
    this.setState(state);
    this.props.onTopicBlacklistChanged(this.state.items);
  };

  addItem = () => {
    const newItemElement = document.getElementById("outlined-name");
    if (newItemElement.value === "") return;

    const state = this.state;

    const itemarray = this.state.items;

    itemarray.push(newItemElement.value);
    state.items = itemarray;
    newItemElement.value = "";
    this.setState(state);
    request.post("/blacklist", { items: state.items });
    this.props.onTopicBlacklistChanged(state.items);
  };

  render() {
    return (
      <div className="blacklist-card">
        <Typography variant="h5" style={{ marginBottom: "16px" }}>
          Blacklist
        </Typography>
        <div className="inputfield">
          <SimpleTextField id="new-item-field" />
          <div style={{ paddingTop: "8px" }}>
            <AddButton blacklist={this} />
          </div>
        </div>
        <StandardTableCard
          pageColor={this.props.pageColor}
          blacklist={this}
          items={this.state.items}
        />
      </div>
    );
  }
}

export default BlacklistCard;
