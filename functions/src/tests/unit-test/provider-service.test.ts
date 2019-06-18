import CorporatieNLService from "../../services/provider/corporatiennl-service";
import Provider from "../../utils/enums/provider-enum";
import AedesService from "../../services/provider/aedes-service";

test("Test the CorporatieNL provider service", async () => {
  // Arrange
  const url =
    "https://www.corporatienl.nl/artikelen/is-stroomopslag-de-volgende-stap-naar-energieneutraal-wonen/";
  const service = new CorporatieNLService();

  // Act
  const article = await service.getRawArticle(url);

  // Assert
  expect(article.url).toBe(url);
  expect(typeof article.title).toBe("string");
  expect(article.title).toBe(
    "Is stroomopslag de volgende stap naar energieneutraal wonen?"
  );
  expect(typeof article.text).toBe("string");
  expect(Number.isNaN(article.timestamp)).toBe(false);
  expect(article.provider).toBe(Provider.CorporatieNL);
});

test("Test the Aedes provider service", async () => {
  // Arrange
  const url =
    "https://www.aedes.nl/artikelen/woningmarkt/hervorming-woningmarkt/nieuwbouw-huurwoningen-in-gevaar.html";
  const service = new AedesService();

  // Act
  const article = await service.getRawArticle(url);

  // Assert
  expect(article.url).toBe(url);
  expect(typeof article.title).toBe("string");
  expect(article.title).toBe(
    "Woningcorporaties: nieuwbouw huurwoningen in gevaar"
  );
  expect(typeof article.text).toBe("string");
  expect(Number.isNaN(article.timestamp)).toBe(false);
  expect(article.provider).toBe(Provider.Aedes);
});

test("Test the provider service byte length checker", async () => {
  // Arrange
  const service = new AedesService();
  const dummyText =
    "We horen veel discussies over het samenwerken van corporaties om te profiteren van digitalisering. Wat zijn daarnaast de kansen en struikelblokken door digitalisering? Is een volledig digitale corporatie wenselijk? We vroegen Marije Eleveld (Directeur-bestuurder Bo-Ex) naar haar visie.";

  // Assert
  expect(service.getByteLen(dummyText)).toBe(286);
});
