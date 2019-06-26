import React, { Component } from "react";
import "./ArticleTable.css";

import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

class ArticleTableRow extends Component {
  state = {
    expand: false,
    mailCount: ""
  };

  constructor(props) {
    super(props);
    let mailCount = props.mailCount;
    if (props.mailCount === undefined || props.mailCount.length === 0) {
      mailCount = "";
    } else {
      mailCount = props.mailCount.length;
    }
    this.state.mailCount = mailCount;
    console.log(props.mailCount);
    console.log(this.state.mailCount);
  }

  topicRows = () => {
    let topicRows = [];

    for (let i = 0; i < this.props.topicData.length; i++) {
      topicRows.push(
        <div className="article-table-row-ArticleTableRowInfo-data">
          {this.props.topicData[i].name +
            "(" +
            this.props.topicData[i].score +
            ")"}
        </div>
      );
    }
    return topicRows;
  };

  categoryRows = () => {
    let categoryRows = [];

    for (let i = 0; i < this.props.categoryData.length; i++) {
      categoryRows.push(
        <div className="article-table-row-ArticleTableRowInfo-data">
          {this.props.categoryData[i].name +
            "(" +
            this.props.categoryData[i].score +
            ")"}
        </div>
      );
    }
    return categoryRows;
  };

  render() {
    return (
      <div className="article-table-row">
        <div
          className="article-table-row-color"
          style={{ backgroundColor: this.props.color }}
        />
        <div className="article-table-row-date"> {this.props.date}</div>
        <div className="article-table-row-title">
          <a href={this.props.url} target="_blank" rel="noopener noreferrer">
            {" "}
            {this.props.title}
          </a>{" "}
        </div>

        <div className="article-table-row-expander">
          <ExpandMore
            style={{
              fontSize: "30px",
              paddingTop: "5px",
              display: this.state.expand === false ? "" : "none"
            }}
            onClick={() => {
              this.setState({ expand: true });
            }}
          />
          <ExpandLess
            style={{
              fontSize: "30px",
              display: this.state.expand === false ? "none" : ""
            }}
            onClick={() => {
              this.setState({ expand: false });
              console.log(this.state.expand);
            }}
          />
        </div>
        <div className="article-table-row-mail">{this.state.mailCount}</div>
        <div
          className="article-table-row-ArticleTableRowInfo"
          style={{ display: this.state.expand === false ? "none" : "" }}
        >
          <div className="article-table-row-ArticleTableRowInfo-header">
            <div style={{ height: "auto", width: "auto", float: "left" }}>
              <div className="article-table-row-ArticleTableRowInfo-topics">
                Categories
              </div>
              {this.categoryRows()}
            </div>
            <div style={{ height: "auto", width: "auto", float: "left" }}>
              <div className="article-table-row-ArticleTableRowInfo-topics">
                Topics
              </div>
              {this.topicRows()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleTableRow;
