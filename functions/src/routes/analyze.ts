import * as express from "express";

import CorporatieNLFetchEngine from "../engine/corporatienl-fetch-engine";
import AedesFetchEngine from "../engine/aedes-fetch-engine";
import EmailAnalyzer from "../services/mail/email-analyzer-service";

const CFE = new CorporatieNLFetchEngine();
const AFE = new AedesFetchEngine();
const EAS = new EmailAnalyzer();

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", async (req, res) => {
  console.time("ANALYZING ARTICLES");
  console.time("ANALYZING AEDES");
  await AFE.FetchNewArticles();
  console.timeEnd("ANALYZING AEDES");
  console.time("ANALYZING CORPORATIENL");
  await CFE.FetchNewArticles();
  console.timeEnd("ANALYZING CORPORATIENL");
  console.timeEnd("ANALYZING ARTICLES");
  await EAS.analyzeEmails();
  console.log("Analyzing emails!");
  await res.send("Analyze");
});

module.exports = router;
