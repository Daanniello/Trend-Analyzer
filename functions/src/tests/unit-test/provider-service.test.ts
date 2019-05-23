import CorporatieNLService from "../../services/provider/corporatiennl-service";
import Provider from "../../utils/enums/provider-enum";
import AedesService from "../../services/provider/aedes-service";

test("Test the CorporatieNL provider service", async () => {
  const url =
    "https://www.corporatienl.nl/artikelen/is-stroomopslag-de-volgende-stap-naar-energieneutraal-wonen/";
  const service = new CorporatieNLService();
  const article = await service.getRawArticle(url);

  expect(article.url).toBe(url);
  expect(typeof article.title).toBe("string");
  expect(typeof article.text).toBe("string");
  expect(Number.isNaN(article.timestamp)).toBe(false);
  expect(article.provider).toBe(Provider.CorporatieNL);
});

test("Test the Aedes provider service", async () => {
  const url =
    "https://www.aedes.nl/artikelen/woningmarkt/hervorming-woningmarkt/nieuwbouw-huurwoningen-in-gevaar.html";
  const service = new AedesService();
  const article = await service.getRawArticle(url);

  expect(article.url).toBe(url);
  expect(typeof article.title).toBe("string");
  expect(typeof article.text).toBe("string");
  expect(Number.isNaN(article.timestamp)).toBe(false);
  expect(article.provider).toBe(Provider.Aedes);
});
