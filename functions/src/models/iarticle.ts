import { Provider } from "../common/provider-enum";

interface IArticle {
  _link: string;
  _provider: Provider;
  _title: string;
  _topics: Array<String>;
  _categories: Array<String>;
  _aticleDate: Date;
}

export default IArticle;
