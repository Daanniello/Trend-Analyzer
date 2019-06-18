import AedesFetchEngine from "../../engine/aedes-fetch-engine";

class TestAedesFetchEngine extends AedesFetchEngine {
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

test("Test the Aedes fetch engine", async () => {
  // Arrange
  const engine = new TestAedesFetchEngine();
  await engine.testSetCheerioHTML(engine["baseURL"], 1);
  const urls = await engine.testFetchArticleURLs();

  // Act

  // Assert

  expect(engine["baseURL"]).toBe(
    "https://www.aedes.nl/search?documentType=article&orderBy=sortDate&order=desc&r23_r1"
  );
  expect(engine.testNextPageURL(engine["baseURL"], 1)).toBe(
    "https://www.aedes.nl/search?documentType=article&orderBy=sortDate&order=desc&r23_r1:page=1&r23_r1:pageSize=6"
  );
  expect(engine.testIsValidPage()).toBe(true);
  expect(urls.length).toBe(6);

  await engine.testSetCheerioHTML(engine["baseURL"], 1000);
  expect(engine.testIsValidPage()).toBe(false);
});
