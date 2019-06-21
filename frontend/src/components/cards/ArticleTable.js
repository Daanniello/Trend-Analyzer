import React, { Component } from "react";

import ArticleTableRow from "./ArticleTableRow";
import { Typography } from "@material-ui/core";

class ArticleTable extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  Row = () => {
    return <ArticleTableRow />;
  };

  render() {
    return (
      <div className="article-table-container">
        <div className="article-table-header">
          <div className="article-table-header-date">Date</div>
          <div className="article-table-header-title">Title</div>
          <div className="article-table-header-expand">Expand</div>
        </div>
      </div>
    );
  }
}

export default ArticleTable;
