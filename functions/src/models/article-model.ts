import Provider from "../utils/enums/provider-enum";
/**
 * interface for the article
 */
interface IArticle {
  url: string;
  provider: Provider;
  title: string;
  topics: { name: string; score: number }[];
  categories: { name: string; score: number }[];
  misc: { key: string; values: string[] }[];
  timestamp: number;
}

export default IArticle;
