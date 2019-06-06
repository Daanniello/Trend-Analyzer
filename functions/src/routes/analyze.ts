import * as express from "express";

import CorporatieNLFetchEngine from "../engine/corporatienl-fetch-engine";
import AedesFetchEngine from "../engine/aedes-fetch-engine";
const CFE = new CorporatieNLFetchEngine();
const AFE = new AedesFetchEngine();

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", async (req, res) => {
  console.time("ANALYZING ARTICLES");
  console.time("ANALYZING AEDES");
  await AFE.FetchArticles();
  console.timeEnd("ANALYZING AEDES");
  console.time("ANALYZING CORPORATIENL");
  await CFE.FetchArticles();
  console.timeEnd("ANALYZING CORPORATIENL");
  console.timeEnd("ANALYZING ARTICLES");
  res.send("Analyze");
});

module.exports = router;
