import * as express from "express";

import CorporatieNLFetchEngine from "../engine/corporatienl-fetch-engine";
import AedesFetchEngine from "../engine/aedes-fetch-engine";
import ArticleService from "../services/database/article-service";
const CFE = new CorporatieNLFetchEngine();
const AFE = new AedesFetchEngine();
const DB = new ArticleService();

/* Ping Router */
const router = express.Router();

router.post("", async (req, res) => {
  await DB.deleteAll();

  console.time("Analyzing Articles");
  // Fetch articles from Aedes
  console.time("Analyzing Aedes");
  await AFE.FetchInitialArticles();
  console.timeEnd("Analyzing Aedes");

  // Fetch articles from CorporatieNL
  console.time("Analyzing CorporatieNL");
  await CFE.FetchInitialArticles();
  console.timeEnd("Analyzing CorporatieNL");
  console.timeEnd("Analyzing Articles");
  res.send("Reset");
});

module.exports = router;
