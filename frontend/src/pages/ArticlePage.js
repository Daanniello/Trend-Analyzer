import React from "react";
import "./ArticlePage.css";

import Typography from "@material-ui/core/Typography";
import SearchBar from "../components/fields/SearchBar";
import ArticleTable from "../components/cards/ArticleTable";
import * as moment from "moment";

class ArticlePage extends React.Component {
  state = {
    searchbarContent: "",
    allData: [],
    showData: []
  };
  constructor(props) {
    super(props);
    this.state.allData = this.props.articleData;
    this.state.showData = this.props.articleData;
    props.onPageChange(props.pageColor);
  }

  handleInputChange = e => {
    const state = this.state;
    state.searchbarContent = e.target.value;
    state.showData = this.getFilteredDataFromSearch();
    this.setState(state);
    console.log(state);
  };

  getFilteredDataFromSearch = () => {
    return this.state.allData.filter(item => {
      return (
        item.title
          .toLowerCase()
          .includes(this.state.searchbarContent.toLowerCase()) ||
        moment
          .unix(item.timestamp)
          .format("DD-MM-YYYY")
          .includes(this.state.searchbarContent)
      );
    });
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          <Typography style={{ color: "#551F5C" }} variant="h4">
            Articles
          </Typography>
        </div>
        <SearchBar onChange={this.handleInputChange} description="Articles" />
        <ArticleTable articleData={this.state.showData} headerColor="#D24DFF" />
      </div>
    );
  }
}

export default ArticlePage;
