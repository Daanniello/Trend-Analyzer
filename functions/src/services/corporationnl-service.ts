import * as cheerio from "cheerio";
import AsyncRequest from "../helpers/async-request";
import { Provider } from "../common/provider-enum";
import Article from "../models/article";
import ProviderService from "../services/ProviderService";
import * as moment from "moment";
import "moment/locale/nl";
import { formatDate } from "tough-cookie";

class CorporationNLService extends ProviderService {
  async scrapeArticle(url: any): Promise<any> {
    // Get html from a page
    const request = new AsyncRequest();
    const body = await request.get(url);

    // store the html into cheerio to make traversion possible
    const $ = cheerio.load(body);
    const articleDate = $(".o-panorama__content span")
      .text()
      .replace("/", "");

    // Set up an article with the link, provider, title, date and intro
    const article = new Article(
      url,
      Provider.CorporatieNL,
      $(".c-panorama__heading").text(),
      super.formDate(articleDate)
    );
    console.log("Date" + article.articleDate);
  }
}

export default CorporationNLService;
