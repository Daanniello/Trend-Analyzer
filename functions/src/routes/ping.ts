import * as express from "express";
// import AsyncRequest from "../helpers/async-request";
import CorporationNLService from "../services/provider/corporatiennl-service";
import AedesService from "../services/provider/aedes-service";
import ProviderService from "../services/provider/provider-service";
import TextRazorService from "../services/api/textrazor-service";

/* Ping Router */
const router = express.Router();

const aedesService = new AedesService();
const corporatienlService = new CorporationNLService();

/* Implement endpoints */
router.get("", async (req, res) => {
  const url =
    "https://www.corporatienl.nl/artikelen/de-maatschappelijke-impact-van-digitalisering-is-groter-dan-we-denken/";
  let service: ProviderService | null = checkDomain(url);
  const razor = new TextRazorService();
  razor.postTextRazor();

  if (service != null) {
    await service.getRawArticle(url);
    res.send("Scraped!");
  } else {
    res.send("Pong!");
  }
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
    return corporatienlService;
  } else if (site == "www.aedes.nl") {
    return aedesService;
  } else {
    return null;
  }
}

module.exports = router;
