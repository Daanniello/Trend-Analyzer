import React from "react";
import "./LatestArticle.css";
import { Typography } from "@material-ui/core";
import * as moment from "moment";

const LatestArticleCard = props => {
  const loadCategories = () => {
    const categories = [];

    categories.push(
      <Typography key={"category-header"} className="latest-article-card-url">
        Categories:
      </Typography>
    );
    for (const [i, category] of props.latestArticle.categories.entries()) {
      categories.push(
        <Typography
          key={`category-${i}`}
          variant="caption"
          className="latest-article-card-url"
        >
          {category.name} ({Math.round(category.score * 100)})
        </Typography>
      );
    }

    return categories;
  };

  const loadTopics = () => {
    const topics = [];

    topics.push(
      <Typography key={"topic-header"} className="latest-article-card-url">
        Topics:
      </Typography>
    );
    for (const [i, topic] of props.latestArticle.topics.entries()) {
      topics.push(
        <Typography
          key={`topic-${i}`}
          variant="caption"
          className="latest-article-card-url"
        >
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
        <a
          href={props.latestArticle.url}
          className="href"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          {props.latestArticle.title}
        </a>
      </Typography>
      <div className="article-combined">
        <div style={{ width: "50%", height: "100%", float: "left" }}>
          {loadCategories()}
        </div>

        <div style={{ width: "50%", height: "100%", float: "left" }}>
          {loadTopics()}
        </div>
      </div>
      <div className="latest-article-card-date">
        <Typography>
          Date:{" "}
          {moment.unix(props.latestArticle.timestamp).format("DD-MM-YYYY")}
        </Typography>
      </div>
    </div>
  );
};

export default LatestArticleCard;
