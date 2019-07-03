import * as cheerio from "cheerio";
import * as moment from "moment";

import ProviderService from "../services/provider/provider-service";
import CorporatieNLService from "../services/provider/corporatiennl-service";

import IRawArticle from "../models/raw-article-model";
import IArticle from "../models/article-model";

import AsyncRequest from "../helpers/async-request";
import TextRazorService from "../services/api/textrazor-service";
import ArticleService from "../services/database/article-service";

const request = new AsyncRequest();
const TRS = new TextRazorService();

abstract class ArticleFetchEngine {
  protected readonly baseURL: string = "";
  protected readonly service: ProviderService = new CorporatieNLService();
  protected articleService: ArticleService | null;
  protected currentPageNumber: number = 1;
  protected $: CheerioStatic = cheerio.load("");

  constructor(database: boolean = true) {
    this.articleService = database ? new ArticleService() : null;
  }

  public async FetchNewArticles(pageNumber = 1): Promise<void> {
    // Check database
    if (this.articleService == null) {
      console.log("NO DATABASE");
      return;
    }

    await this.setCheerioHTML(this.baseURL, this.currentPageNumber);

    const moment2017 = moment("2017", "YYYY").format();

    let stopLoop = false;

    while (await this.isValidPage()) {
      // GET ARTICLES FROM PAGE
      const articleURLs = await this.fetchArticleURLs();

      // LOOP OVER ARTICLES AND ANALYZE THEM
      for (const articleURL of articleURLs) {
        const rawArticle = await this.getRawArticle(articleURL);

        if (isNaN(rawArticle.timestamp)) {
          continue;
        }

        // Check if we already have this article
        const result = await this.articleService.getQuery({
          url: rawArticle.url,
          timestamp: rawArticle.timestamp
        });
        if (result.length > 0) stopLoop = true;

        // Check if the article is from before 2017
        if (moment.unix(rawArticle.timestamp).isBefore(moment2017)) {
          stopLoop = true;
        }
        // Stop if one of the ifs before this is true
        if (stopLoop) break;

        const article = await this.analyzeArticle(rawArticle);

        this.articleService.updateArticle(article.url, article);
      }

      // if the loop should be stopped STOP
      if (stopLoop) break;

      // Go to the next page and retrieve the HTML
      this.currentPageNumber++;
      await this.setCheerioHTML(this.baseURL, this.currentPageNumber);
    }
  }

  public async FetchInitialArticles(): Promise<void> {}

  // Set cheerio to the new HTML
  protected async setCheerioHTML(
    baseURL: string,
    pageNumber: number
  ): Promise<void> {
    const url = this.nextPageURL(baseURL, pageNumber);
    const pageHTML = await request.get(url);
    this.$ = cheerio.load(pageHTML);
  }

  protected async analyzeArticle(rawArticle: IRawArticle): Promise<IArticle> {
    return await TRS.postTextRazor(rawArticle);
  }

  protected nextPageURL(baseURL: string, pageNumber: number): string {
    throw new Error("Abstract class error");
  }

  protected isValidPage(): boolean {
    throw new Error("Abstract class error");
  }

  protected async fetchArticleURLs(): Promise<string[]> {
    throw new Error("Abstract class error");
  }

  protected async getRawArticle(url: string): Promise<IRawArticle> {
    throw new Error("Abstract class error");
  }
}

export default ArticleFetchEngine;
