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

class TableCard extends React.Component {
  state = {
    searchbarContent: "",
    inUseColors: [],
    rows: [],
    data: [],
    sortCondition: "all"
  };

  constructor(props) {
    super(props);

    this.state.data = this.props.data.filter(d => {
      d.checked = false;
      d.color = COLORS.default;
      return d;
    });

    this.updateTopics();
  }

  handleInputChange = e => {
    const currentState = this.state;
    this.state.searchbarContent = e.target.value;
    this.setState(currentState);
    this.updateTopics();
  };

  handleOnCheck = id => {
    if (this.state.inUseColors.length >= COLORS.checked.length) {
      return;
    }
    let t = this.state.data[id];
    t.checked = !t.checked;
    if (t.checked) {
      const availableColor = COLORS.checked.filter(color => {
        if (this.state.inUseColors.indexOf(color) < 0) {
          return color;
        }
        return false;
      })[0];
      this.state.inUseColors.push(availableColor);
      t.color = availableColor;
      this.props.addTopic(t);
    } else {
      this.state.inUseColors.splice(this.state.inUseColors.indexOf(t.color), 1);
      t.color = COLORS.default;
      this.props.removeTopic(t);
    }
    this.state.data[id] = t;
    this.updateTopics();
  };

  updateTopics = () => {
    console.log("UPDATE");
    const rows = [];
    this.state.data.forEach((topic, index) => {
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

    this.state.rows = rows;
  };

  sortData = condition => {
    console.log(condition);
    const state = this.state;
    state.data = state.data.sort((a, b) => {
      if (condition === "all") {
        return b.totals.allTime - a.totals.allTime;
      } else if (condition === "year") {
        return b.totals.last365 - a.totals.last365;
      } else if (condition === "month") {
        return b.totals.last30 - a.totals.last30;
      } else if (condition === "week") {
        return b.totals.last7 - a.totals.last7;
      }
    });
    state.sortCondition = condition;
    this.setState(state);
    this.updateTopics();
  };

  render() {
    return (
      <div className="table-cart-container">
        <SearchBar
          onChange={this.handleInputChange}
          description={this.props.tableTitle}
        />
        <Typography variant="h2" className="table-card">
          <div className="table-header">
            <div className="table-row">
              <Typography
                className="table-row-title"
                style={{ color: "white" }}
              >
                {this.props.tableTitle}
              </Typography>
              <div className="table-row-seperate-header">
                <Typography
                  onClick={() => this.sortData("all")}
                  className="table-row-all"
                  style={{
                    color:
                      this.state.sortCondition === "all" ? "purple" : "white"
                  }}
                >
                  All
                </Typography>
                <Typography
                  onClick={() => this.sortData("year")}
                  className="table-row-yearly"
                  style={{
                    color:
                      this.state.sortCondition === "year" ? "purple" : "white"
                  }}
                >
                  Yearly
                </Typography>
                <Typography
                  onClick={() => this.sortData("month")}
                  className="table-row-monthly"
                  style={{
                    color:
                      this.state.sortCondition === "month" ? "purple" : "white"
                  }}
                >
                  Monthly
                </Typography>
                <Typography
                  onClick={() => this.sortData("week")}
                  className="table-row-weekly"
                  style={{
                    color:
                      this.state.sortCondition === "week" ? "purple" : "white"
                  }}
                >
                  Weekly
                </Typography>
                <Typography
                  className="table-row-details"
                  style={{ color: "white" }}
                >
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
