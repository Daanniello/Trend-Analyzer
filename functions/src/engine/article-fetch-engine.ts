import * as cheerio from "cheerio";

import ProviderService from "../services/provider/provider-service";
import CorporatieNLService from "../services/provider/corporatiennl-service";

import IRawArticle from "../models/raw-article-model";
import IArticle from "../models/article-model";

import AsyncRequest from "../helpers/async-request";
const request = new AsyncRequest();

abstract class ArticleFetchEngine {
  protected readonly baseURL: string = "";
  protected readonly service: ProviderService = new CorporatieNLService();
  protected currentPageNumber: number = 1;
  protected $: CheerioStatic = cheerio.load("");

  public async FetchArticles(): Promise<void> {
    let currentPageURL: string = this.nextPageURL(this.currentPageNumber);
    let currentPageHTML: string = await this.getPageHTML(currentPageURL);
    this.setCheerioHTML(currentPageHTML);

    let count = 0;
    while ((await this.isValidPage()) && count < 10) {
      count++;

      // GET ARTICLES FROM PAGE
      const articleURLs = await this.fetchArticleURLs(currentPageHTML);

      // LOOP OVER ARTICLES AND ANALYZE THEM
      for (const articleURL of articleURLs) {
        const rawArticle = await this.getRawArticle(articleURL);
        console.log(rawArticle);
      }

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
    return {} as IArticle;
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
