import React from "react";

import "./TopicPage.css";

import Typography from "@material-ui/core/Typography";
import Searchbar from "../components/fields/searchbar";

const TopicPage = props => {
  return (
    <div className="container">
      <div className="header">
        <Typography variant="h4">Topic</Typography>
      </div>
      <div className="search">
        <div className="search-bar" />
        <Searchbar />
      </div>
    </div>
  );
};

export default TopicPage;
