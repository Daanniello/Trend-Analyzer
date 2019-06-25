import * as express from "express";
import * as moment from "moment";

import CorporatieNLFetchEngine from "../engine/corporatienl-fetch-engine";
import AedesFetchEngine from "../engine/aedes-fetch-engine";
import UpdateService from "../services/database/update-service";
import EmailAnalyzer from "../services/mail/email-analyzer-service";

const CFE = new CorporatieNLFetchEngine();
const AFE = new AedesFetchEngine();
const EAS = new EmailAnalyzer();
const DB = new UpdateService();

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", async (req, res) => {
  const lastupdate = await DB.get("lastupdate");
  if (moment.unix(lastupdate.timestamp).isBefore(moment().add(-30, "m"))) {
    const timestamp: number = moment().unix();
    DB.set("lastupdate", { timestamp });

    try {
      console.time("ANALYZING ARTICLES");
      console.time("ANALYZING AEDES");
      await AFE.FetchNewArticles();
      console.timeEnd("ANALYZING AEDES");
      console.time("ANALYZING CORPORATIENL");
      await CFE.FetchNewArticles();
      console.timeEnd("ANALYZING CORPORATIENL");
      console.timeEnd("ANALYZING ARTICLES");
      console.time("ANALYZING EMAILS");
      await EAS.analyzeEmails();
      console.timeEnd("ANALYZING EMAILS");
    } catch (error) {
      console.log(error);
      console.log("Expected error(500) cause: Billing account not configured");
    }

    res.send({
      lastUpdated: timestamp
    });
  } else {
    res.send({
      lastUpdated: lastupdate.timestamp
    });
  }
});

module.exports = router;
