import * as express from "express";
// import AsyncRequest from "../helpers/async-request";
import CorporationNLService from "../services/corporationnl-service";
import AedesService from "../services/aedes-service";
import ProviderService from "../services/ProviderService";

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
  const url =
    "https://www.corporatienl.nl/artikelen/de-maatschappelijke-impact-van-digitalisering-is-groter-dan-we-denken/";
  let service: ProviderService = checkDomain(url);
  service.scrapeArticle(url);
  res.send("Pong!");
});

function checkDomain(url: string) {
  let site;
  if (url.indexOf("//") > -1) {
    site = url.split("/")[2];
  } else {
    site = url.split("/")[0];
  }

  //find & remove port number
  site = site.split(":")[0];
  //find & remove "?"
  site = site.split("?")[0];

  if (site == "www.corporatienl.nl") {
    return new CorporationNLService(url);
  } //if (site == "www.aedes.nl")
  else {
    return new AedesService(url);
  }
}

module.exports = router;
