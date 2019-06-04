import React from "react";

import "./TopicPage.css";

import Typography from "@material-ui/core/Typography";
import TableCard from "../components/cards/TableCard";
import GraphCard from "../components/cards/GraphCard";

class TopicPage extends React.Component {
  state = {
    topics: []
  };

  constructor(props) {
    super(props);

    this.addTopic = topic => {
      const state = this.state;
      state.topics.push(topic);
      this.setState(state);
    };

    this.removeTopic = topic => {
      const state = this.state;
      state.topics = state.topics.filter(t => {
        if (t.name !== topic.name) {
          return t;
        }
      });
      this.setState(state);
    };
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <Typography variant="h4">Topic</Typography>
        </div>
        <TableCard addTopic={this.addTopic} removeTopic={this.removeTopic} />
        <GraphCard topics={this.state.topics} />
      </div>
    );
  }
}

export default TopicPage;
