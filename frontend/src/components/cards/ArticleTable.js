import React, { Component } from "react";

import ArticleTableRow from "./ArticleTableRow";
import MailOutline from "@material-ui/icons/MailOutline";
import * as moment from "moment";

import { FixedSizeList as List } from "react-window";

class ArticleTable extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  Row = ({ index, key, style }) => {
    const article = this.props.articleData[index];
    if (!article) return;
    const {
      timestamp,
      title,
      provider,
      topics,
      categories,
      mailOccurrences,
      url
    } = article;

    const time = moment.unix(timestamp).format("DD-MM-YYYY");
    const color =
      provider === "Aedes" ? "rgb(30, 171, 215)" : "rgb(255, 128, 0)";
    return (
      <div id={`article-${index}`} key={key} style={style}>
        <ArticleTableRow
          date={time}
          title={title}
          color={color}
          topicData={topics}
          categoryData={categories}
          mailCount={mailOccurrences}
          url={url}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="article-table-container">
        <div
          className="article-table-header"
          style={{ backgroundColor: this.props.headerColor }}
        >
          <div className="article-table-header-date">Date</div>
          <div className="article-table-header-title">Title</div>

          <div className="article-table-header-expand">Expand</div>
          <div className="article-table-header-ismail">
            <MailOutline />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "calc(100% - 50px)"
          }}
        >
          <List
            height={548}
            itemSize={40.9}
            itemCount={this.props.articleData.length}
            style={{ width: "100%" }}
          >
            {this.Row}
          </List>
        </div>
      </div>
    );
  }
}

export default ArticleTable;
