import * as express from "express";
import * as moment from "moment";

import ArticleService from "../services/database/article-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", async (req, res) => {
  const service = new ArticleService();
  const articles = await service.getAll();

  const categories: any[] = [];

  const now = moment();
  const lastWeek = now.clone().add(-7, "d");
  const lastMonth = now.clone().add(-30, "d");
  const lastYear = now.clone().add(-365, "d");

  const findOrCreate = (name: string) => {
    const index = categories.findIndex(category => {
      return category.name === name;
    });
    if (index >= 0) return index;

    categories.push({
      name: name,
      totals: {
        allTime: 0,
        last365: 0,
        last30: 0,
        last7: 0
      },
      articles: []
    });
    return categories.length - 1;
  };

  for (const article of articles) {
    const articleMoment = moment.unix(article.timestamp);
    for (const category of article.categories) {
      const index = findOrCreate(category.name);
      let categoryObj = categories[index];

      // Add Article
      categoryObj.articles.push({
        timestamp: article.timestamp,
        score: category.score,
        title: article.title,
        url: article.url,
        mailOccurences: 0
      });

      // Add counters
      categoryObj.totals.allTime++;
      if (articleMoment.isBetween(lastWeek, now)) categoryObj.totals.last7++;
      if (articleMoment.isBetween(lastMonth, now)) categoryObj.totals.last30++;
      if (articleMoment.isBetween(lastYear, now)) categoryObj.totals.last365++;

      categories[index] = categoryObj;
    }
  }

  const sortedCategories = categories.sort((a: any, b: any) => {
    return b.totals.allTime - a.totals.allTime;
  });

  sortedCategories.forEach((category, index) => {
    const categories = sortedCategories[index].articles;

    sortedCategories[index].articles = categories.sort((a: any, b: any) => {
      return b.timestamp - a.timestamp;
    });
  });

  res.send(sortedCategories);
});

module.exports = router;
