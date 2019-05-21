import { Provider } from "../common/provider-enum";
/**
 * interface for the article model class
 */
interface IArticle {
  _link: string;
  _provider: Provider;
  _title: string;
  _topics: Array<String>;
  _categories: Array<String>;
  _articleDate: Date;
}

export default IArticle;