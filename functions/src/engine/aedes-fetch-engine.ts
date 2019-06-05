import ArticleFetchEngine from "./article-fetch-engine";

import ProviderService from "../services/provider/provider-service";
import AedesService from "../services/provider/aedes-service";
import IRawArticle from "../models/raw-article-model";

class AedesFetchEngine extends ArticleFetchEngine {
  protected readonly baseURL: string =
    "https://www.aedes.nl/search?documentType=article&orderBy=sortDate&order=desc";
  protected readonly service: ProviderService = new AedesService();

  protected nextPageURL(pageNumber: number): string {
    return `${this.baseURL}&r23_r1:page=${pageNumber}&r23_r1:pageSize=6`;
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
