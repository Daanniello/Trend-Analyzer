import CorporatieNLFetchEngine from "../engine/corporatienl-fetch-engine";

const CFE = new CorporatieNLFetchEngine();

(async () => {
  await CFE.FetchArticles();
})();
