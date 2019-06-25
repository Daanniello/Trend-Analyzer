import React from "react";
import "./ArticlePage.css";

import Typography from "@material-ui/core/Typography";
import SearchBar from "../components/fields/SearchBar";
import ArticleTable from "../components/cards/ArticleTable";

class ArticlePage extends React.Component {
  state = {};
  constructor(props) {
    super(props);

    props.onPageChange(props.pageColor);
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <Typography style={{ color: "#551F5C" }} variant="h4">
            Articles
          </Typography>
        </div>
        <SearchBar />
        <ArticleTable
          articleData={this.props.articleData}
          headerColor="#D24DFF"
        />
      </div>
    );
  }
}

export default ArticlePage;
