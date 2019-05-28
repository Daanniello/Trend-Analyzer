import * as express from "express";
import * as moment from "moment";

import ArticleService from "../services/database/article-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", async (req, res) => {
  const service = new ArticleService();
  const articles = await service.getAll();

  const now = moment().startOf("day");
  const lastWeek = now.clone().add(-7, "d");
  const lastMonth = now.clone().add(-30, "d");

  let providers: any = {};
  let hotTopics: any = {
    month: {},
    week: {}
  };
  let hotCategories: any = {
    month: {},
    week: {}
  };

  for (const article of articles) {
    // Count the provider count
    const providerCount = providers[article.provider];
    providers[article.provider] = providerCount ? providerCount + 1 : 1;

    // Check if last week / last month
    const articleMoment = moment.unix(article.timestamp);
    const wasLastWeek = articleMoment.isAfter(lastWeek);
    const wasLastMonth = articleMoment.isAfter(lastMonth);

    if (!wasLastMonth) continue; // If it wasn't last month it wasn't hot

    for (const topic of article.topics) {
      const count = hotTopics.month[topic.name];
      hotTopics.month[topic.name] = count ? count + 1 : 1;
      if (wasLastWeek) {
        const weekcount = hotTopics.week[topic.name];
        hotTopics.week[topic.name] = weekcount ? weekcount + 1 : 1;
      }
    }
    for (const category of article.categories) {
      const count = hotCategories.month[category.name];
      hotCategories.month[category.name] = count ? count + 1 : 1;
      if (wasLastWeek) {
        const weekcount = hotCategories.week[category.name];
        hotCategories.week[category.name] = weekcount ? weekcount + 1 : 1;
      }
    }
  }

  const hot: any = {
    topic: {
      week: getSortedArray(hotTopics.week),
      month: getSortedArray(hotTopics.month)
    },
    category: {
      week: getSortedArray(hotCategories.week),
      month: getSortedArray(hotCategories.month)
    }
  };

  res.send({
    providers: providers,
    hot: hot
  });
});

function getSortedArray(obj: any): { name: string; amount: string }[] {
  const sorted = Object.keys(obj).sort((a: string, b: string) => {
    return obj[b] - obj[a];
  });

  const sortedArray: { name: string; amount: string }[] = [];
  for (let i = 0; i < sorted.length; i++) {
    sortedArray.push({ name: sorted[i], amount: obj[sorted[i]] });
  }
  return sortedArray;
}

module.exports = router;
