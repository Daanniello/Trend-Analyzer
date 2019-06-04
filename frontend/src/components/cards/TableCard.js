import React from "react";
import "./TableCard.css";
import TableCardRow from "./TableCardRow";
import Infinite from "react-infinite";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SearchBar from "../fields/SearchBar";

const styles = {};

const COLORS = {
  default: "#551f5c",
  checked: [
    "#9D000F",
    "#1EABD7",
    "#FF8000",
    "#C19000",
    "#cad212",
    "#D24DFF",
    "#12D4FF",
    "#D80000",
    "#003478",
    "#8A8B8E"
  ]
};

let topics = require("./topics");
topics = topics.filter(topic => {
  let t = topic;
  t.checked = false;
  t.color = COLORS.default;
  return t;
});

class TableCard extends React.Component {
  state = {
    searchbarContent: "",
    inUseColors: [],
    rows: []
  };

  constructor(props) {
    super(props);
    this.handleInputChange = e => {
      const currentState = this.state;
      this.state.searchbarContent = e.target.value;
      this.setState(currentState);
      this.updateTopics();
    };

    this.handleOnCheck = id => {
      if (this.state.inUseColors.length >= COLORS.checked.length) {
        return;
      }
      let t = topics[id];
      t.checked = !t.checked;
      if (t.checked) {
        const availableColor = COLORS.checked.filter(color => {
          if (this.state.inUseColors.indexOf(color) < 0) {
            return color;
          }
        })[0];
        this.state.inUseColors.push(availableColor);
        t.color = availableColor;
        this.props.addTopic(t);
      } else {
        this.state.inUseColors.splice(
          this.state.inUseColors.indexOf(t.color),
          1
        );
        t.color = COLORS.default;
        this.props.removeTopic(t);
      }
      topics[id] = t;
      this.updateTopics();
    };

    this.updateTopics = () => {
      const rows = [];
      topics.forEach((topic, index) => {
        const { name, totals, articles, checked, color } = topic;
        const displayConditional = name
          .toLowerCase()
          .includes(this.state.searchbarContent.toLowerCase());

        if (displayConditional) {
          rows.push(
            <TableCardRow
              id={index}
              handleCheck={this.handleOnCheck}
              checked={checked}
              color={color}
              key={`topic-${index}`}
              title={name}
              all={totals.allTime}
              yearly={totals.last365}
              monthly={totals.last30}
              weekly={totals.last7}
              details={articles}
            />
          );
        }
      });
      const state = this.state;
      state.rows = rows;
      this.setState(state);
    };

    this.updateTopics();
  }

  componentDidMount() {
    // const table = document.getElementsByClassName("table-collection")[0];
    // console.log(tableHeight);
    // table.setAttribute("containerHeight", tableHeight);
  }

  render() {
    return (
      <div className="table-cart-container">
        <SearchBar onChange={this.handleInputChange} />
        <Typography variant="h2" className="table-card">
          <div className="table-header">
            <div className="table-row">
              <Typography className="table-row-title" Style="color:white">
                Topic
              </Typography>
              <div className="table-row-seperate-header">
                <Typography className="table-row-all" Style="color:white">
                  All
                </Typography>
                <Typography className="table-row-yearly" Style="color:white">
                  Yearly
                </Typography>
                <Typography className="table-row-monthly" Style="color:white">
                  Monthly
                </Typography>
                <Typography className="table-row-weekly" Style="color:white">
                  Weekly
                </Typography>
                <Typography className="table-row-details" Style="color:white">
                  Details
                </Typography>
              </div>
            </div>
          </div>
          <div className="table-collection">
            <Infinite containerHeight={270} elementHeight={30}>
              {this.state.rows}
            </Infinite>
          </div>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(TableCard);
