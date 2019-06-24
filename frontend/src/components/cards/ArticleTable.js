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
    const { timestamp, title, provider, topics, categories } = article;
    const time = moment.unix(timestamp).format("DD-MM-YYYY");
    const color = provider === "Aedes" ? "blue" : "red";
    return (
      <div id={`article-${index}`} key={key} style={style}>
        <ArticleTableRow
          date={time}
          title={title}
          color={color}
          topicData={topics}
          categoryData={categories}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="article-table-container">
        <div className="article-table-header">
          <div className="article-table-header-date">Date</div>
          <div className="article-table-header-title">Title</div>

          <div className="article-table-header-expand">Expand</div>
          <div className="article-table-header-ismail">
            <MailOutline />
          </div>
        </div>
        <div
          style={{
            overflowY: "scroll",
            width: "100%",
            height: "calc(100% - 50px)"
          }}
        >
          <List
            height={410}
            itemSize={40.6}
            itemCount={this.props.articleData.length}
          >
            {this.Row}
          </List>
        </div>
      </div>
    );
  }
}

export default ArticleTable;
