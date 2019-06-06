import ArticleFetchEngine from "./article-fetch-engine";

import ProviderService from "../services/provider/provider-service";
import CorporatieNLService from "../services/provider/corporatiennl-service";
import IRawArticle from "../models/raw-article-model";

class CorporatieNLFetchEngine extends ArticleFetchEngine {
  protected readonly baseURL: string = "https://www.corporatienl.nl/artikelen";
  protected readonly service: ProviderService = new CorporatieNLService();

  public async FetchInitialArticles(): Promise<void> {
    this.FetchNewArticles();
  }

  protected nextPageURL(baseURL: string, pageNumber: number): string {
    return `${baseURL}/page/${pageNumber}`;
  }

  protected isValidPage(): boolean {
    const pageNotFoundBody = this.$(".body--404");
    return pageNotFoundBody.length === 0;
    // throw new Error("Abstract class error");
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

    this.$(
      ".o-grid.o-grid--with-gutter.u-card-spacing.js-archive-lazyload .o-card__content a"
    ).map((index, element) => {
      articleHrefs.push(element.attribs.href);
    });

    return articleHrefs;
  }

  protected async getRawArticle(url: string): Promise<IRawArticle> {
    return await this.service.getRawArticle(url);
  }
}

export default CorporatieNLFetchEngine;
