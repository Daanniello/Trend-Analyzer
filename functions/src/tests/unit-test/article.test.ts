import IArticle from "../../models/article-model";
import Provider from "../../utils/enums/provider-enum";

import * as moment from "moment";

test("Test the property types of the article model", () => {
  // Arrange
  const article: IArticle = {
    url: "www.exampleurl.com",
    provider: Provider.CorporatieNL,
    title: "This is an example title",
    topics: [],
    categories: [],
    misc: [],
    timestamp: moment().unix()
  };

  // Act
  expect(typeof article.url).toBe("string");
  expect(typeof article.provider).toBe("string");
  expect(typeof article.title).toBe("string");
  expect(Array.isArray(article.topics)).toBe(true);
  expect(Array.isArray(article.categories)).toBe(true);
  expect(typeof article.timestamp).toBe("number");
});
