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

    props.onPageChange(props.pageColor);

    this.addTopic = topic => {
      const state = this.state;
      state.topics.push(topic);
      this.setState(state);
    };

    this.clearTopic = () => {
      const state = this.state;
      state.topics = [];
      this.setState(state);
    };

    this.removeTopic = topic => {
      const state = this.state;
      state.topics = state.topics.filter(t => {
        if (t.name !== topic.name) {
          return t;
        }
        return false;
      });
      this.setState(state);
    };
  }

  insertCustomTrendsFrontEnd = trend => {
    this.props.insertCustomTrendsFrontEnd(trend);
    // const state = this.state;
    // state.topics = trend;
    // this.setState(state);
  };

  render() {
    return (
      <div className="container">
        <div className="topic-header">
          <Typography style={{ color: "#551F5C" }} variant="h4">
            Topics
          </Typography>
        </div>
        <TableCard
          tableTitle="Topics"
          type="Topic"
          data={this.props.topicData}
          addTopic={this.addTopic}
          removeTopic={this.removeTopic}
          clearTopic={this.clearTopic}
          pageColor={this.props.pageColor}
          customTrends={this.props.customTrendsTopics}
          insertCustomTrendsFrontEnd={trend =>
            this.insertCustomTrendsFrontEnd(trend)
          }
        />
        <GraphCard
          topics={this.state.topics}
          pageColor={this.props.pageColor}
        />
      </div>
    );
  }
}

export default TopicPage;
