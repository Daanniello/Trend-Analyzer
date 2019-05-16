import * as cheerio from "cheerio";
import AsyncRequest from "../helpers/async-request";
import { Provider } from "../common/provider-enum";
import Article from "../models/article";
import ProviderService from "../services/ProviderService";
import * as moment from "moment";
import "moment/locale/nl";

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

    var words = articleDate.split(" ");
    console.log("nul2" + words[1]);

    console.log(words[3]);

    moment.locale("nl");

    //console.log(date);

    const article = new Article(
      url,
      Provider.CorporatieNL,
      $(".c-panorama__heading").text(),
      new Date(
        words[3] +
          "-" +
          moment()
            .month("mei")
            .format("M") +
          "-" +
          words[1]
      )
    );
  }
}

export default CorporationNLService;
