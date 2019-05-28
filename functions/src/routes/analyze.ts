import * as express from "express";

import CorporatieNLFetchEngine from "../engine/corporatienl-fetch-engine";
const CFE = new CorporatieNLFetchEngine();

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", (req, res) => {
  (async () => {
    await CFE.FetchArticles();
  })();
  res.send("Analyze");
});

module.exports = router;
