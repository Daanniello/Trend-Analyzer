import React, { Component } from "react";

import ArticleTableRow from "./ArticleTableRow";
import MailOutline from "@material-ui/icons/MailOutline";
import * as moment from "moment";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

class ArticleTable extends Component {
  state = {};

  Row = ({ index, style }) => {
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
      <div id={`article-${index}`} key={`article-${index}`} style={style}>
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
        <div id="articletable">
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemSize={40.9}
                itemCount={this.props.articleData.length}
                width={width}
              >
                {this.Row}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default ArticleTable;
