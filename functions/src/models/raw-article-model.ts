import Provider from "../utils/enums/provider-enum";
/**
 * interface for the raw article
 */
interface IRawArticle {
  url: string;
  provider: Provider;
  title: string;
  text: string;
  timestamp: number;
}

export default IRawArticle;
