import * as moment from "moment";
import * as cheerio from "cheerio";
import AsyncRequest from "../helpers/async-request";
/**
 * abstract provider service to use with specific website services.
 * Provides default methods
 */
abstract class ProviderService {
  protected request: any;
  protected body: any;
  protected $: any;
  constructor() {}

  async scrapeArticle(url: any): Promise<any> {
    // Get html from a page
    this.request = new AsyncRequest();
    this.body = await this.request.get(url);

    // store the html into cheerio to make traversion possible
    this.$ = cheerio.load(this.body);

    this.getText(url);
  }

  formMoment(date: any): moment.Moment {
    moment.locale("nl");

    const newMoment = moment(date, "D MMMM YYYY");

    return newMoment;
  }

  getText(url: string) {}

  getTopicsAndCategories(articleText: string) {
    // TODO: API CALLS AND STUFF
    return new Array(new Array());
  }
}

export default ProviderService;
