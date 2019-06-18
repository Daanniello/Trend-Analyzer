import IArticle from "../../models/article-model";
import Provider from "../../utils/enums/provider-enum";
import IRawArticle from "../../models/raw-article-model";
import ICredential from "../../models/credential-model";
import IUpdate from "../../models/update-model";

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
    timestamp: moment().unix(),
    mailOccurrences: []
  };

  // Act & assert
  expect(typeof article.url).toBe("string");
  expect(typeof article.provider).toBe("string");
  expect(typeof article.title).toBe("string");
  expect(Array.isArray(article.topics)).toBe(true);
  expect(Array.isArray(article.categories)).toBe(true);
  expect(typeof article.timestamp).toBe("number");
});

test("test the properties of the raw-articles model", async () => {
  // Arrange
  const rawArticle: IRawArticle = {
    url: "www.test.com",
    provider: Provider.CorporatieNL,
    title: "Test tile",
    text: "Test text",
    timestamp: Date.now()
  };

  // Act & Assert
  expect(typeof rawArticle.url).toBe("string");
  expect(typeof rawArticle.provider).toBe("string");
  expect(typeof rawArticle.title).toBe("string");
  expect(typeof rawArticle.text).toBe("string");
  expect(typeof rawArticle.timestamp).toBe("number");
});

test("'test the properties of the credential model", async () => {
  // Arrange
  const cred: ICredential = {
    email: "a@a.com",
    apiKey: "fakeApi",
    pincode: "1234"
  };

  // Act & Assert
  expect(typeof cred.email).toBe("string");
  expect(typeof cred.apiKey).toBe("string");
  expect(typeof cred.pincode).toBe("string");
});

test("'test the properties of the update model", async () => {
  // Arrange
  const cred: IUpdate = {
    timestamp: Date.now()
  };

  // Act & Assert
  expect(typeof cred.timestamp).toBe("number");
});
