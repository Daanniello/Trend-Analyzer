import * as express from "express";
import * as moment from "moment";

import ArticleService from "../services/database/article-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", async (req, res) => {
  const service = new ArticleService();
  const articles = await service.getAll();

  const topics: any[] = [];

  const now = moment();
  const lastWeek = now.clone().add(-7, "d");
  const lastMonth = now.clone().add(-30, "d");
  const lastYear = now.clone().add(-365, "d");

  const findOrCreate = (name: string) => {
    const index = topics.findIndex(topic => {
      return topic.name === name;
    });
    if (index >= 0) return index;

    topics.push({
      name: name,
      totals: {
        allTime: 0,
        last365: 0,
        last30: 0,
        last7: 0
      },
      articles: []
    });
    return topics.length - 1;
  };

  for (const article of articles) {
    const articleMoment = moment.unix(article.timestamp);
    for (const topic of article.topics) {
      const index = findOrCreate(topic.name);
      let topicObj = topics[index];

      // Add Article
      topicObj.articles.push({
        timestamp: article.timestamp,
        score: topic.score,
        title: article.title,
        url: article.url,
        mailOccurences: 0
      });

      // Add counters
      topicObj.totals.allTime++;
      if (articleMoment.isBetween(lastWeek, now)) topicObj.totals.last7++;
      if (articleMoment.isBetween(lastMonth, now)) topicObj.totals.last30++;
      if (articleMoment.isBetween(lastYear, now)) topicObj.totals.last365++;

      topics[index] = topicObj;
    }
  }

  res.send(topics);
});

[
  {
    name: "Solar Energy",
    totals: {
      allTime: 2000,
      last360: 1000,
      last30: 100,
      last7: 10
    },
    articles: [
      {
        timestamp: "UNIX",
        score: 1,
        title: "Some article",
        link: "https://somelink.com/somearticle",
        mailOccurences: 0
      }
    ]
  }
];

module.exports = router;
