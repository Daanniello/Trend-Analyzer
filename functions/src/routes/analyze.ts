import * as express from "express";
import * as moment from "moment";

import CorporatieNLFetchEngine from "../engine/corporatienl-fetch-engine";
import AedesFetchEngine from "../engine/aedes-fetch-engine";
import UpdateService from "../services/database/update-service";

const CFE = new CorporatieNLFetchEngine();
const AFE = new AedesFetchEngine();
const EAS = new EmailAnalyzer();
const DB = new UpdateService();

import EmailAnalyzer from "../services/mail/email-analyzer-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", (req, res) => {
  (async () => {
    const lastupdate = await DB.get("lastupdate");
    if (moment.unix(lastupdate.timestamp).isBefore(moment().add(-30, "m"))) {
      const timestamp: number = moment().unix();
      DB.set("lastupdate", { timestamp });

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
      res.send({
        lastUpdated: timestamp
      });
    } else {
      res.send({
        lastUpdated: lastupdate
      });
    }
  })();
});

module.exports = router;
