import React from "react";

import "./TopicPage.css";

import Typography from "@material-ui/core/Typography";
import TableCard from "../components/cards/TableCard";
import GraphCard from "../components/cards/GraphCard";

const TopicPage = props => {
  return (
    <div className="container">
      <div className="header">
        <Typography variant="h4">Topic</Typography>
      </div>
      <TableCard />
      <GraphCard />
    </div>
  );
};

export default TopicPage;
