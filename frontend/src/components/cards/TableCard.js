import React from "react";
import "./TableCard.css";
import TableCardRow from "./TableCardRow";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SearchBar from "../fields/SearchBar";

console.time("REQUIRE JSON");
let topics = require("./topics");
// topics = topics.filter(topic => {
//   if (topic.totals.allTime > 10) {
//     return topic;
//   }
// });
console.timeEnd("REQUIRE JSON");

const styles = {};

const BASE_COLORS = [
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
];

class TableCard extends React.Component {
  state = {
    searchbarContent: "",
    inUseColors: []
  };

  constructor(props) {
    super(props);
    this.handleInputChange = e => {
      const currentState = this.state;
      this.state.searchbarContent = e.target.value;
      this.setState(currentState);
    };

    this.maintoggle = (checked, _color) => {
      let color;
      let state = this.state;
      if (state.inUseColors.length >= 10 && checked) return null;
      if (checked) {
        color = BASE_COLORS.filter(color => {
          return state.inUseColors.indexOf(color) < 0;
        })[0];
        state.inUseColors.push(color);
        state.checkedAmount++;
      } else {
        color = "#551f5c";
        state.inUseColors.splice(state.inUseColors.indexOf(_color), 1);
      }
      this.setState(state);
      return color;
    };
  }

  render() {
    console.time("CREATE ROWS");
    const rows = [];
    topics.forEach((topic, index) => {
      const { name, totals, articles } = topic;
      const displayConditional = name
        .toLowerCase()
        .includes(this.state.searchbarContent.toLowerCase());
      const style = { display: displayConditional ? "block" : "none" };
      rows.push(
        <TableCardRow
          key={`topic-${index}`}
          id={`topic-${index}`}
          index={index}
          title={name}
          all={totals.allTime}
          yearly={totals.last360}
          monthly={totals.last30}
          weekly={totals.last7}
          details={articles}
          maintoggle={this.maintoggle}
          style={style}
        />
      );
    });

    console.timeEnd("CREATE ROWS");

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
          {console.time("GENERATE ROWS")}

          <div className="table-collection">{rows}</div>

          {console.timeEnd("GENERATE ROWS")}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(TableCard);
