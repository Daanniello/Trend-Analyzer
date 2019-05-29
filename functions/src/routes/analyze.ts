import * as express from "express";

import CorporatieNLFetchEngine from "../engine/corporatienl-fetch-engine";
import AedesFetchEngine from "../engine/aedes-fetch-engine";
import ArticleService from "../services/database/article-service";
const CFE = new CorporatieNLFetchEngine();
const AFE = new AedesFetchEngine();
const articleService = new ArticleService();

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", (req, res) => {
  (async () => {
    // console.time("ANALYZING ARTICLES");
    // console.time("ANALYZING CORPORATIENL");
    // await CFE.FetchArticles();
    // console.timeEnd("ANALYZING CORPORATIENL");
    // console.time("ANALYZING AEDES");
    // await AFE.FetchArticles();
    // console.timeEnd("ANALYZING AEDES");
    // console.timeEnd("ANALYZING ARTICLES");
  })();
  res.send("Analyze");
});

module.exports = router;
