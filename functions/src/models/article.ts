import { Provider } from "../common/provider-enum";

class Article {
  private _link: string;
  private _provider: Provider;
  private _title: string;
  private _topics: Array<String>;
  private _categories: Array<String>;
  private _aticleDate: Date;

  constructor(
    link: string,
    provider: Provider,
    title: string,
    articleDate: Date
  ) {
    this._link = link;
    this._provider = provider;
    this._title = title;
    this._aticleDate = articleDate;
    this._topics = new Array<String>();
    this._categories = new Array<String>();
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
  get topics(): Array<String> {
    return this._topics;
  }
  set topics(newTopics: Array<String>) {
    this.topics = newTopics;
  }

  // categories getter and setter
  get categories(): Array<String> {
    return this._categories;
  }
  set categories(newCategories: Array<String>) {
    this._categories = newCategories;
  }

  // topics getter and setter
  get articleDate(): Date {
    return this._aticleDate;
  }
  set articleDate(newArticleDate: Date) {
    this._aticleDate = newArticleDate;
  }
}

export default Article;
