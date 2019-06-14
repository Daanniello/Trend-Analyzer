import ArticleFetchEngine from "./article-fetch-engine";

import ProviderService from "../services/provider/provider-service";
import AedesService from "../services/provider/aedes-service";
import IRawArticle from "../models/raw-article-model";
import moment = require("moment");

class AedesFetchEngine extends ArticleFetchEngine {
  protected readonly baseURL: string =
    "https://www.aedes.nl/search?documentType=article&orderBy=sortDate&order=desc&r23_r1";
  protected readonly service: ProviderService = new AedesService();

  public async FetchInitialArticles(): Promise<void> {
    // TODO: Function times out in firebase, if this function needs to be called while running this needs to be fixed. Can be ran in node.js with database permissions
    let urls: string[] = [];
    for (let h = +moment().format("YYYY"); h >= 2017; h--) {
      urls.push("https://www.aedes.nl/search/years/" + h + "/?r23_r1");
    }

    for (let i = 0; i < urls.length; i++) {
      let currentPageURL: string = this.nextPageURL(
        urls[i],
        this.currentPageNumber
      );
      let currentPageHTML: string = await this.getPageHTML(currentPageURL);
      this.setCheerioHTML(currentPageHTML);

      while (await this.isValidPage()) {
        // GET ARTICLES FROM PAGE
        const articleURLs = await this.fetchArticleURLs(currentPageHTML);

        // LOOP OVER ARTICLES AND ANALYZE THEM
        for (const articleURL of articleURLs) {
          const rawArticle = await this.getRawArticle(articleURL);

          const article = await this.analyzeArticle(rawArticle);

          this.articleService.add(article);
        }

        // Go to the next page and retrieve the HTML
        this.currentPageNumber++;
        currentPageURL = await this.nextPageURL(
          urls[i],
          this.currentPageNumber
        );
        currentPageHTML = await this.getPageHTML(currentPageURL);
        this.setCheerioHTML(currentPageHTML);
      }
      this.currentPageNumber = 1;
    }
  }

  protected nextPageURL(baseURL: string, pageNumber: number): string {
    return `${baseURL}:page=${pageNumber}&r23_r1:pageSize=6`;
  }

  protected isValidPage(): boolean {
    const articles = this.$(
      ".col-md-10.col-md-offset-2.col-sm-9.col-sm-offset-3.col-xs-12"
    );
    return articles.length > 0;
  }

  protected async fetchArticleURLs(page: string): Promise<string[]> {
    const articleHrefs: string[] = [];

    if (this.currentPageNumber === 1) {
      this.$(
        ".c-section.c-section--single-row.u-contain-padding .o-card__content a"
      ).map((index, element) => {
        articleHrefs.push(element.attribs.href);
      });
    }

    this.$(".col-md-10.col-md-offset-2.col-sm-9.col-sm-offset-3.col-xs-12").map(
      (index, element) => {
        articleHrefs.push(element.attribs.href);
      }
    );

    return articleHrefs;
  }

  protected async getRawArticle(url: string): Promise<IRawArticle> {
    return await this.service.getRawArticle(url);
  }
}

export default AedesFetchEngine;
