import * as moment from "moment";

class ArticleDataConverter {
  articles;

  constructor(articles) {
    this.articles = articles;
  }

  ConvertArticlesToGeneral() {
    const now = moment().startOf("day");
    const lastWeek = now.clone().add(-7, "d");
    const lastMonth = now.clone().add(-30, "d");

    let providers = {};
    let hotTopics = {
      month: {},
      week: {}
    };
    let hotCategories = {
      month: {},
      week: {}
    };

    this.articles = this.articles.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    this.latestArticles = [];
    this.latestArticles[0] = this.articles.filter(article => {
      if (article.provider === "CorporatieNL") {
        return article;
      }
      return false;
    });

    this.latestArticles[1] = this.articles.filter(article => {
      if (article.provider === "Aedes") {
        return article;
      }
      return false;
    });

    for (const article of this.articles) {
      // Count the provider count
      const providerCount = providers[article.provider];
      providers[article.provider] = providerCount ? providerCount + 1 : 1;

      // Check if last week / last month
      const articleMoment = moment.unix(article.timestamp);
      const wasLastWeek = articleMoment.isAfter(lastWeek);
      const wasLastMonth = articleMoment.isAfter(lastMonth);

      if (!wasLastMonth) continue; // If it wasn't last month it wasn't hot

      // Count the amount of occurences of each topic and category
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

    // Create object containing topics/categories sorted on amount of occurences
    const hot = {
      topic: {
        week: getSortedArray(hotTopics.week),
        month: getSortedArray(hotTopics.month)
      },
      category: {
        week: getSortedArray(hotCategories.week),
        month: getSortedArray(hotCategories.month)
      }
    };

    var json = {
      providers: providers,
      hot: hot,
      latestArticle: this.latestArticles
    };

    return json;
  }

  ConvertArticlesToCategories() {
    const categories = [];

    // Get moment for different timestamps
    const now = moment();
    const lastWeek = now.clone().add(-7, "d");
    const lastMonth = now.clone().add(-30, "d");
    const lastYear = now.clone().add(-365, "d");

    // Check if the category is already in the array and return the index
    const findOrCreate = name => {
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

    // Loop through all the categories of all articles
    for (const article of this.articles) {
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

        // Increase counters
        categoryObj.totals.allTime++;
        if (articleMoment.isBetween(lastWeek, now)) categoryObj.totals.last7++;
        if (articleMoment.isBetween(lastMonth, now))
          categoryObj.totals.last30++;
        if (articleMoment.isBetween(lastYear, now))
          categoryObj.totals.last365++;

        categories[index] = categoryObj;
      }
    }

    // Sort categories on all time occurrences
    const sortedCategories = categories.sort((a, b) => {
      return b.totals.allTime - a.totals.allTime;
    });

    sortedCategories.forEach((category, index) => {
      const categories = sortedCategories[index].articles;

      sortedCategories[index].articles = categories.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    });

    return sortedCategories;
  }
  ConvertArticlesToTopics() {
    const topics = [];

    // Get moment for different timestamps
    const now = moment();
    const lastWeek = now.clone().add(-7, "d");
    const lastMonth = now.clone().add(-30, "d");
    const lastYear = now.clone().add(-365, "d");

    // Check if the category is already in the array and return the index
    const findOrCreate = name => {
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

    // Loop through all the categories of all articles
    for (const article of this.articles) {
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

        // Increase counters
        topicObj.totals.allTime++;
        if (articleMoment.isBetween(lastWeek, now)) topicObj.totals.last7++;
        if (articleMoment.isBetween(lastMonth, now)) topicObj.totals.last30++;
        if (articleMoment.isBetween(lastYear, now)) topicObj.totals.last365++;

        topics[index] = topicObj;
      }
    }

    // Sort topics on all time occurrences
    const sortedTopics = topics.sort((a, b) => {
      return b.totals.allTime - a.totals.allTime;
    });

    sortedTopics.forEach((topic, index) => {
      const articles = sortedTopics[index].articles;

      sortedTopics[index].articles = articles.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    });

    return sortedTopics;
  }
}

// Method to sort an object
function getSortedArray(obj) {
  const sorted = Object.keys(obj).sort((a, b) => {
    return obj[b] - obj[a];
  });

  const sortedArray = [];
  for (let i = 0; i < sorted.length; i++) {
    sortedArray.push({ name: sorted[i], amount: obj[sorted[i]] });
  }
  return sortedArray;
}

export default ArticleDataConverter;
