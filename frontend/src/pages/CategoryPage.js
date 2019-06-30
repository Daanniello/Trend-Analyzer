import React from "react";

import "./CategoryPage.css";

import Typography from "@material-ui/core/Typography";
import TableCard from "../components/cards/TableCard";
import GraphCard from "../components/cards/GraphCard";

class CategoryPage extends React.Component {
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

  render() {
    return (
      <div className="container">
        <div className="header">
          <Typography style={{ color: "#551F5C" }} variant="h4">
            Categories
          </Typography>
        </div>
        <TableCard
          tableTitle="Categories"
          type="Category"
          data={this.props.categoryData}
          addTopic={this.addTopic}
          removeTopic={this.removeTopic}
          pageColor={this.props.pageColor}
          customTrends={this.props.customTrendsCategories}
          insertCustomTrendsFrontEnd={(trend) => this.props.insertCustomTrendsFrontEnd(trend)}
        />
        <GraphCard
          topics={this.state.topics}
          pageColor={this.props.pageColor}
        />
      </div>
    );
  }
}

export default CategoryPage;
