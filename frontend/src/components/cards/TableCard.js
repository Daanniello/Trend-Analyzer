import React from "react";
import "./TableCard.css";
import TableCardRow from "./TableCardRow";

import { FixedSizeList as List } from "react-window";

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
    allData: [],
    showData: [],
    sortCondition: "all",
    random: Math.random() * 1000,
    items: []
  };

  constructor(props) {
    super(props);
    // TODO: HIERZO :!_+?D

    this.state.allData = this.props.data.filter(d => {
      d.checked = false;
      d.color = COLORS.default;
      return d;
    });

    this.state.showData = this.state.allData;
  }

  handleInputChange = e => {
    const state = this.state;
    state.searchbarContent = e.target.value;
    state.showData = this.getFilteredDataFromSearch();
    this.setState(state);
  };

  getFilteredDataFromSearch = () => {
    return this.state.allData.filter(item => {
      return item.name
        .toLowerCase()
        .includes(this.state.searchbarContent.toLowerCase());
    });
  };

  handleOnCheck = (id, check) => {
    if (this.state.inUseColors.length >= COLORS.checked.length && !check) {
      return;
    }
    const state = this.state;
    let t = state.allData[id];
    t.checked = !t.checked;
    if (t.checked) {
      const availableColor = COLORS.checked.filter(color => {
        if (state.inUseColors.indexOf(color) < 0) {
          return color;
        }
        return false;
      })[0];
      state.inUseColors.push(availableColor);
      t.color = availableColor;
      this.props.addTopic(t);
    } else {
      state.inUseColors.splice(state.inUseColors.indexOf(t.color), 1);
      t.color = COLORS.default;
      this.props.removeTopic(t);
    }
    state.allData[id] = t;
    state.showData = this.getFilteredDataFromSearch();
    this.setState(state);
    this.updateList();
  };

  sortData = condition => {
    const state = this.state;
    state.allData = state.allData.sort((a, b) => {
      if (condition === "all") {
        return b.totals.allTime - a.totals.allTime;
      } else if (condition === "year") {
        return b.totals.last365 - a.totals.last365;
      } else if (condition === "month") {
        return b.totals.last30 - a.totals.last30;
      } else if (condition === "week") {
        return b.totals.last7 - a.totals.last7;
      }
      return 0;
    });
    state.sortCondition = condition;
    this.setState(state);
    state.showData = this.getFilteredDataFromSearch();
    this.setState(state);
    this.updateList();
  };

  Row = ({ index, style }) => {
    const item = this.state.showData[index];
    if (!item) return;
    const { checked, color, name, totals, articles } = item;
    return (
      <TableCardRow
        id={index}
        style={style}
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
  };

  updateList() {
    const state = this.state;
    state.random = Math.random() * 1000;
    this.setState(state);
  }

  render() {
    return (
      <div className="table-card-container">
        <SearchBar
          onChange={this.handleInputChange}
          description={this.props.tableTitle}
        />
        <Typography variant="h2" className="table-card">
          <div
            className="table-header"
            style={{ backgroundColor: this.props.pageColor }}
          >
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
            <List
              id={"list" + this.state.random}
              height={210}
              itemSize={35}
              itemCount={this.state.showData.length}
            >
              {this.Row}
            </List>
          </div>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(TableCard);
