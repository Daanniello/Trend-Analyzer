import React from "react";
import "./LatestArticle.css";
import { Typography } from "@material-ui/core";
import * as moment from "moment";

const LatestArticleCard = props => {
  const loadCategories = () => {
    const categories = [];

    categories.push(
      <Typography className="latest-article-card-url">Categories:</Typography>
    );
    for (const category of props.latestArticle.categories) {
      console.log(category);
      categories.push(
        <Typography variant="caption" className="latest-article-card-url">
          {category.name} ({Math.round(category.score * 100)})
        </Typography>
      );
    }

    return categories;
  };

  const loadTopics = () => {
    const topics = [];

    topics.push(
      <Typography className="latest-article-card-url">Topics:</Typography>
    );
    for (const topic of props.latestArticle.topics) {
      topics.push(
        <Typography variant="caption" className="latest-article-card-url">
          {topic.name} ({Math.round(topic.score * 100)})
        </Typography>
      );
    }

    return topics;
  };

  return (
    <div className="latest-article-card general-page-item">
      <Typography className="latest-article-card-title">
        Latest Article
      </Typography>
      <Typography className="latest-article-card-company">
        Company: {props.latestArticle.provider}
      </Typography>
      <Typography className="latest-article-card-url">
        <a href={props.latestArticle.url} className="href" target="_blank">
          {" "}
          {props.latestArticle.title}
        </a>
      </Typography>

      <div style={{ width: "50%", height: "auto", float: "left" }}>
        {loadCategories()}
      </div>

      <div style={{ width: "50%", height: "auto", float: "left" }}>
        {loadTopics()}
      </div>

      <Typography className="latest-article-card-date">
        Date: {moment.unix(props.latestArticle.timestamp).format("DD-MM-YYYY")}
      </Typography>
    </div>
  );
};

export default LatestArticleCard;
