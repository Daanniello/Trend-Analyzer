import * as moment from "moment";
import * as cheerio from "cheerio";

import AsyncRequest from "../../helpers/async-request";
import IRawArticle from "../../models/raw-article-model";
import Provider from "../../utils/enums/provider-enum";

/**
 * abstract provider service to use with specific website services.
 * Provides default methods
 */

// Max article size in bytes
const MAX_ARTICLE_SIZE = 200000;

abstract class ProviderService {
  provider: Provider;
  request: AsyncRequest;
  body: string;
  $: CheerioStatic;

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

    if (this.getByteLen(rawArticle.text) > MAX_ARTICLE_SIZE) {
      rawArticle.text = "";
    }

    return rawArticle;
  }

  // Get the size of the string
  getByteLen(textContent: any) {
    // Force string type
    textContent = String(textContent);

    var byteLen = 0;
    for (var i = 0; i < textContent.length; i++) {
      var c = textContent.charCodeAt(i);
      byteLen +=
        c < 1 << 7
          ? 1
          : c < 1 << 11
          ? 2
          : c < 1 << 16
          ? 3
          : c < 1 << 21
          ? 4
          : c < 1 << 26
          ? 5
          : c < 1 << 31
          ? 6
          : Number.NaN;
    }
    return byteLen;
  }

  getArticleDate(): moment.Moment {
    throw Error();
  }

  getArticleTitle(): string {
    throw Error();
  }

  getArticleText(): string {
    throw Error();
  }
}

export default ProviderService;
