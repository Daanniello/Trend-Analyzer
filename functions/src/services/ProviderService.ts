import * as moment from "moment";
import * as cheerio from "cheerio";
import AsyncRequest from "../helpers/async-request";

abstract class ProviderService {
  protected request: any;
  protected body: any;
  protected $: any;
  constructor(url: string) {}

  async scrapeArticle(url: any): Promise<any> {
    // Get html from a page
    this.request = new AsyncRequest();
    this.body = await this.request.get(url);

    // store the html into cheerio to make traversion possible
    this.$ = cheerio.load(this.body);

    this.getText(url);
  }

  formDate(date: any): Date {
    var words = date.split(" ");

    moment.locale("nl");

    return new Date(
      words[3] +
        "-" +
        moment()
          .month(words[2])
          .format("MM") +
        "-" +
        words[1]
    );
  }

  getText(url: string) {}
}

export default ProviderService;
