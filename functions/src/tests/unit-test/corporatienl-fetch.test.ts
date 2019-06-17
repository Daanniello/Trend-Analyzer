//import AedesFetchEngine from "../../engine/aedes-fetch-engine";
import CorporatieNLFetchEngine from "../../engine/corporatienl-fetch-engine";
//import Provider from "../../utils/enums/provider-enum";

class TestCorporatieNLFetchEngine extends CorporatieNLFetchEngine {
  constructor() {
    super(false);
  }
  public testIsValidPage(): boolean {
    return this.isValidPage();
  }

  public testNextPageURL(baseURL: string, pageNumber: number): string {
    return this.nextPageURL(baseURL, pageNumber);
  }

  public testSetCheerioHTML(baseURL: string, pageNumber: number) {
    return this.setCheerioHTML(baseURL, pageNumber);
  }

  public testFetchArticleURLs() {
    return this.fetchArticleURLs();
  }

  public increasePageNumber() {
    return this.currentPageNumber++;
  }
}

test("Test the CorporatieNL fetch engine", async () => {
  // Arrange
  const engine = new TestCorporatieNLFetchEngine();
  await engine.testSetCheerioHTML("https://www.corporatienl.nl/artikelen", 1);
  const urls = await engine.testFetchArticleURLs();
  engine.increasePageNumber(); // Increase currentPageNumber to check if it leave out the 4 recent articles
  const urls2 = await engine.testFetchArticleURLs();

  // Act

  // Assert

  expect(engine["baseURL"]).toBe("https://www.corporatienl.nl/artikelen");
  expect(
    engine.testNextPageURL("https://www.corporatienl.nl/artikelen", 1)
  ).toBe("https://www.corporatienl.nl/artikelen/page/1");
  expect(engine.testIsValidPage()).toBe(true);
  expect(urls.length).toBe(12);
  expect(urls2.length).toBe(8);

  await engine.testSetCheerioHTML(
    "https://www.corporatienl.nl/artikelen",
    1000
  );
  expect(engine.testIsValidPage()).toBe(false);
});
