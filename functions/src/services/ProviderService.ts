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

  getText(url: string) {}
}

export default ProviderService;
