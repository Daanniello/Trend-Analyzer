import { Provider } from "../common/provider-enum";
import IArticle from "./iarticle";

/**
 * Generetic article model for storing article data.
 */
class Article implements IArticle {
  _link: string;
  _provider: Provider;
  _title: string;
  _topics: Array<string>;
  _categories: Array<string>;
  _articleDate: Date;

  constructor(
    link: string,
    provider: Provider,
    title: string,
    topics: Array<string>,
    categories: Array<string>,
    articleDate: Date
  ) {
    this._link = link;
    this._provider = provider;
    this._title = title;
    this._articleDate = articleDate;
    this._topics = new Array<string>();
    this._categories = new Array<string>();
  }

  // link getter and setter
  // access getter by : class.link
  // access setter by : class.link = "new link"
  get link(): string {
    return this._link;
  }
  set link(newLink: string) {
    this._link = newLink;
  }

  // provider getter and setter
  get provider(): Provider {
    return this._provider;
  }
  set provider(newProvider: Provider) {
    this._provider = newProvider;
  }

  // title getter and setter
  get title(): string {
    return this._title;
  }
  set title(newTitle: string) {
    this._title = newTitle;
  }

  // topics getter and setter
  get topics(): Array<string> {
    return this._topics;
  }
  set topics(newTopics: Array<string>) {
    this.topics = newTopics;
  }

  // categories getter and setter
  get categories(): Array<string> {
    return this._categories;
  }
  set categories(newCategories: Array<string>) {
    this._categories = newCategories;
  }

  // topics getter and setter
  get articleDate(): Date {
    return this._articleDate;
  }
  set articleDate(newArticleDate: Date) {
    this._articleDate = newArticleDate;
  }
}

export default Article;
