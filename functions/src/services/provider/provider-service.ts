import * as moment from "moment";
import * as cheerio from "cheerio";

import AsyncRequest from "../../helpers/async-request";
import IRawArticle from "../../models/raw-article-model";
import Provider from "../../utils/enums/provider-enum";

/**
 * abstract provider service to use with specific website services.
 * Provides default methods
 */
abstract class ProviderService {
  protected provider: Provider;
  protected request: AsyncRequest;
  protected body: string;
  protected $: CheerioStatic;

  constructor() {
    this.provider = Provider.CorporatieNL;
    this.request = new AsyncRequest();
    this.body = "";
    this.$ = cheerio.load("");
  }

  async getRawArticle(url: string): Promise<IRawArticle> {
    // Get html from a page
    this.body = await this.request.get(url);

    // store the html into cheerio to make traversion possible
    this.$ = cheerio.load(this.body);

    const rawArticle: IRawArticle = {
      url: url,
      provider: this.provider,
      title: this.getArticleTitle(),
      text: this.getArticleText(),
      timestamp: this.getArticleDate().unix()
    };

    return rawArticle;
  }

  protected getArticleDate(): moment.Moment {
    throw Error();
  }

  protected getArticleTitle(): string {
    throw Error();
  }

  protected getArticleText(): string {
    throw Error();
  }
}

export default ProviderService;
