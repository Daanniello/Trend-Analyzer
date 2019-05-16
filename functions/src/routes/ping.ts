import * as express from "express";
// import AsyncRequest from "../helpers/async-request";
import CorporationNLService from "../services/corporationnl-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", async (req, res) => {
  // const request = new AsyncRequest();
  // const body = await request.get(
  //   "https://www.corporatienl.nl/artikelen/de-maatschappelijke-impact-van-digitalisering-is-groter-dan-we-denken/"
  // );

  // // CHEERIO EXAMPLE -> load the body into cheerio and access the document properties
  // const $ = cheerio.load(body);
  // console.log("DE TITEL:" + $(".o-panorama__content").text());
  // console.log("DE CONTENT" + $(".copy-contain-padding").text());
  const service = new CorporationNLService();
  service.scrapeArticle(
    "https://www.corporatienl.nl/artikelen/de-maatschappelijke-impact-van-digitalisering-is-groter-dan-we-denken/"
  );
  res.send("Pong!");
});

module.exports = router;
