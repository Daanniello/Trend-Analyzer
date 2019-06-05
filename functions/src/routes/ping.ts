import * as express from "express";
// import AsyncRequest from "../helpers/async-request";
import CorporationNLService from "../services/provider/corporatiennl-service";
import AedesService from "../services/provider/aedes-service";
import ProviderService from "../services/provider/provider-service";
import TextRazorService from "../services/api/textrazor-service";
import ArticleService from "../services/database/article-service";
import Translator from "../services/api/translation-service";

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
    const corporatienl = new CorporationNLService();
    const translator = new Translator();
    const rawArticle = await corporatienl.getRawArticle(url);

    const article = await razor.postTextRazor(rawArticle);

    const service = new ArticleService();

    translator.translate(rawArticle.text);
    const result = await service.add(article);
    res.json(result);
  } catch (e) {
    console.log("Error" + e);
    res.statusCode = 500;
    res.send(e);
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
