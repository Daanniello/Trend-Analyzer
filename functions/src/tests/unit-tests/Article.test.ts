import Article from "../../models/article";
import { Provider } from "../../common/provider-enum";

test("Test the property types of the article model", () => {
  const topics = new Array<string>();
  const categories = new Array<string>();

  const article = new Article(
    "www.exampleurl.com",
    Provider.CorporatieNL,
    "This is an example title",
    topics,
    categories,
    new Date("10-05-1996")
  );

  expect(typeof article._link).toBe("string");
  expect(typeof article._provider).toBe("number");
  expect(typeof article._title).toBe("string");
  expect(Array.isArray(article._topics)).toBe(true);
  expect(Array.isArray(article._categories)).toBe(true);
  expect(article._articleDate instanceof Date).toBe(true);
});
