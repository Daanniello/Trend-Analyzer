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
  }

  topicRows = () => {
    let topicRows = [];

    for (let i = 0; i < this.props.topicData.length; i++) {
      topicRows.push(
        <div
          key={`topic-${i}`}
          className="article-table-row-ArticleTableRowInfo-data"
        >
          {this.props.topicData[i].name +
            "(" +
            this.props.topicData[i].score +
            ")"}
        </div>
      );
    }
    return topicRows;
  };

  mailRows = () => {
    if (this.props.mailCount === undefined) {
      return;
    }
    let mailUrl = [];

    for (let i = 0; i < this.props.mailCount.length; i++) {
      mailUrl.push(
        <div
          key={`mailurl-${i}`}
          className="article-table-row-ArticleTableRowInfo-data"
        >
          <a
            href={this.props.mailCount[i]}
            rel="noopener noreferrer"
            target="_blank"
          >
            {this.props.mailCount[i]}
          </a>
        </div>
      );
    }
    return mailUrl;
  };

  categoryRows = () => {
    let categoryRows = [];

    for (let i = 0; i < this.props.categoryData.length; i++) {
      categoryRows.push(
        <div
          key={`category-${i}`}
          className="article-table-row-ArticleTableRowInfo-data"
        >
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
          <a
            href={this.props.url}
            target="_blank"
            title={this.props.title}
            rel="noopener noreferrer"
          >
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
            }}
          />
        </div>
        <div className="article-table-row-mail">{this.state.mailCount}</div>
        <div
          className="article-table-row-ArticleTableRowInfo"
          style={{ display: this.state.expand === false ? "none" : "" }}
        >
          <div className="article-table-row-ArticleTableRowInfo-header">
            <div
              style={{
                height: "auto",
                width: "auto",
                float: "left",
                marginRight: "32px"
              }}
            >
              <div style={{ height: "auto", width: "100%" }}>
                {this.mailRows() && this.mailRows().length > 0 && (
                  <div className="article-table-row-ArticleTableRowInfo-maillinks">
                    Mail Url's
                  </div>
                )}

                {this.mailRows()}
              </div>
              <div className="article-table-row-ArticleTableRowInfo-topics">
                {this.categoryRows().length > 0 ? "Categories" : ""}
              </div>
              {this.categoryRows()}
            </div>
            <div style={{ height: "auto", width: "auto", float: "left" }}>
              <div
                className="article-table-row-ArticleTableRowInfo-topics"
                style={{ marginRight: "32px" }}
              >
                {this.topicRows().length > 0 ? "Topics" : ""}
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
