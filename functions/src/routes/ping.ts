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
  const url = "https://www.corporatienl.nl/artikelen/predictive-modelling/";
  let service: ProviderService | null = checkDomain(url);
  console.log(service);
  const razor = new TextRazorService();
  try {
    console.log("1");
    const corporatienlService = new CorporationNLService();
    console.log("2");

    const rawArticle = await corporatienlService.getRawArticle(url);
    console.log("3");

    const article = await razor.postTextRazor(rawArticle);
    console.log("4");
    res.json(article);
  } catch (e) {
    console.log("Error" + e);
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
