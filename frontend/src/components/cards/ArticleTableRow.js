import React, { Component } from "react";
import "./ArticleTable.css";

class ArticleTableRow extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="article-table-row">
        <div className="article-table-row-color" />
        <div className="article-table-row-date" />
        <div className="article-table-row-title" />
        <div className="article-table-row-expander" />
      </div>
    );
  }
}

export default ArticleTableRow;
