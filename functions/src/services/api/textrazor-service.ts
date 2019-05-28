import fetch from "node-fetch";
import IRawArticle from "../../models/raw-article-model";
import IArticle from "../../models/article-model";
import AsyncRequest from "../../helpers/async-request";

const MIN_CATEGORY_SCORE = 0.4;
const MIN_TOPIC_SCORE = 0.6;

class TextRazorService {
  //Use to send POST request to text razor API
  async postTextRazor(rawArticle: IRawArticle): Promise<IArticle> {
    try {
      if (rawArticle.text) {
        const body: any = {
          text: rawArticle.title + rawArticle.text,
          extractors: "topics",
          language: "dut",
          classifiers: "textrazor_mediatopics"
        };

        const options: any = {
          headers: {
            "X-TextRazor-Key":
              "52160e4b73992b0447931c3457c8f6ee8aa0d3c8465d5c1f1d597138"
          },
          body: body
        };

        const request = new AsyncRequest();

        const response = await request.post(
          "https://api.textrazor.com/",
          options
        );

        const obj = JSON.parse(response);

        const article = this.filterJSON(obj, rawArticle);

        return article;
      } else {
        console.log("in else because article to large/no text was given!");
        const article: IArticle = {
          url: rawArticle.url,
          title: rawArticle.title,
          provider: rawArticle.provider,
          categories: [],
          topics: [],
          misc: [],
          timestamp: rawArticle.timestamp
        };
        return article;
      }
    } catch (e) {
      throw e;
    }
  }

  // filter the categories and topics from the JSON object
  filterJSON(json: JSON, rawArticle: IRawArticle): IArticle {
    const article: IArticle = {
      url: rawArticle.url,
      title: rawArticle.title,
      provider: rawArticle.provider,
      categories: [],
      topics: [],
      misc: [],
      timestamp: rawArticle.timestamp
    };

    /*Category section */
    const jsonCategories = JSON.parse(JSON.stringify(json))["response"][
      "categories"
    ];

    const categories: { name: string; score: number }[] = this.formatCategories(
      jsonCategories
    );

    //Filter the duplicate categories
    article.categories = this.getUniqueCategories(categories);

    /*Topic section */
    const jsonTopics = JSON.parse(JSON.stringify(json))["response"]["topics"];

    const topics: { name: string; score: number }[] = this.formatTopics(
      jsonTopics
    );

    article.topics = topics;
    return article;
  }

  formatCategories(jsonCategories: any): { name: string; score: number }[] {
    const categories: { name: string; score: number }[] = [];
    console.log("cat len");
    if (undefined !== jsonCategories && jsonCategories.length) {
      if (jsonCategories.length > 0) {
        for (var i = 0; i < jsonCategories.length; i++) {
          var cat = jsonCategories[i];
          if (cat.score > MIN_CATEGORY_SCORE) {
            const splitCat = cat.label.split(">")[0];
            categories.push({
              name: splitCat,
              score: cat.score
            });
          }
        }
      }
    }

    return categories;
  }

  formatTopics(jsonTopics: any): { name: string; score: number }[] {
    const topics: { name: string; score: number }[] = [];
    console.log("top len");
    if (undefined !== jsonTopics && jsonTopics.length) {
      if (jsonTopics.length > 0) {
        for (var i = 0; i < jsonTopics.length; i++) {
          var top = jsonTopics[i];
          if (top.score > MIN_TOPIC_SCORE) {
            topics.push({
              name: top.label,
              score: top.score
            });
          }
        }
      }
    }

    return topics;
  }

  // Filter duplicate categories and get the highest scores
  getUniqueCategories(
    categories: { name: string; score: number }[]
  ): { name: string; score: number }[] {
    var uniqueCategories: { name: string; score: number }[] = [];

    categories.forEach(function(category) {
      var exists = false;
      var higher = false;
      var highestCatPos: any;

      console.log("un len");
      if (undefined !== uniqueCategories && uniqueCategories.length) {
        if (uniqueCategories.length > 0) {
          uniqueCategories.forEach(function(uniqueCategory) {
            if (category.name == uniqueCategory.name) {
              exists = true;
              if (category.score > uniqueCategory.score) {
                higher = true;
                highestCatPos = uniqueCategories.indexOf(uniqueCategory);
              }
            }
          });
        }
      }

      console.log("exists: " + exists);
      if (!exists) {
        console.log("not exist - so insert");
        uniqueCategories.push(category);
      } else if (exists && higher) {
        console.log("exist - replace");
        if (highestCatPos != -1) {
          uniqueCategories[highestCatPos] = category;
        }
      }
    });

    return uniqueCategories;
  }

  // get request setup
  getTest(url: any) {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data); // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error));
    } catch (e) {
      console.log("Errormessage: " + e);
    }
  }
}

export default TextRazorService;
