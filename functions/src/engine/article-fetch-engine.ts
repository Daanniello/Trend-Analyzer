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
const articleService = new ArticleService();

abstract class ArticleFetchEngine {
  protected readonly baseURL: string = "";
  protected readonly service: ProviderService = new CorporatieNLService();
  protected currentPageNumber: number = 1;
  protected $: CheerioStatic = cheerio.load("");

  public async FetchArticles(): Promise<void> {
    let currentPageURL: string = this.nextPageURL(this.currentPageNumber);
    let currentPageHTML: string = await this.getPageHTML(currentPageURL);
    this.setCheerioHTML(currentPageHTML);

    const moment2017 = moment("2017", "YYYY").format();

    let count = 0;
    let stopLoop = false;
    while ((await this.isValidPage()) && count < 5) {
      count++;

      // GET ARTICLES FROM PAGE
      const articleURLs = await this.fetchArticleURLs(currentPageHTML);

      // LOOP OVER ARTICLES AND ANALYZE THEM
      for (const articleURL of articleURLs) {
        const rawArticle = await this.getRawArticle(articleURL);

        // Check if we already have this article
        const result = await articleService.getQuery({
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
        articleService.add(article);
      }

      // if the loop should be stopped STOP
      if (stopLoop) break;

      // Go to the next page and retrieve the HTML
      this.currentPageNumber++;
      currentPageURL = await this.nextPageURL(this.currentPageNumber);
      currentPageHTML = await this.getPageHTML(currentPageURL);
      this.setCheerioHTML(currentPageHTML);
    }
  }

  private setCheerioHTML(pageHTML: string): void {
    this.$ = cheerio.load(pageHTML);
  }

  private async getPageHTML(url: string): Promise<string> {
    return await request.get(url);
  }

  private async analyzeArticle(rawArticle: IRawArticle): Promise<IArticle> {
    return await TRS.postTextRazor(rawArticle);
  }

  protected nextPageURL(pageNumber: number): string {
    throw new Error("Abstract class error");
  }

  protected isValidPage(): boolean {
    throw new Error("Abstract class error");
  }

  protected async fetchArticleURLs(page: string): Promise<string[]> {
    throw new Error("Abstract class error");
  }

  protected async getRawArticle(url: string): Promise<IRawArticle> {
    throw new Error("Abstract class error");
  }
}

export default ArticleFetchEngine;
