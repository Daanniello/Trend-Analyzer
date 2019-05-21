import { Provider } from "../common/provider-enum";
import Article from "../models/article";
import ProviderService from "../services/ProviderService";
import * as moment from "moment";
import "moment/locale/nl";

/**
 * The service to scrape articles from CorporationNL
 */
class CorporationNLService extends ProviderService {
  getText(url: string) {
    // console.log(date);
    const articleDate = this.$(".o-panorama__content span")
      .text()
      .replace("/", "");

    var words = articleDate.split(" ");
    console.log("nul2" + words[1]);

    console.log(words[3]);

    moment.locale("nl");

    const text =
      this.$(".c-panorama__heading").text() +
      "\n" +
      this.$(".copy__intro p").text() +
      "\n" +
      this.$(".content").text();

    // Call to Textrazor API for topics and categories
    // Recieve list of topics and list of categories
    const response = this.getTopicsAndCategories(text);
    const topics = response[0];
    const categories = response[1];

    const article = new Article(
      url,
      Provider.CorporatieNL,
      this.$(".c-panorama__heading").text(),
      topics,
      categories,
      super.formMoment(articleDate).toDate()
    );

    console.log(article.link);
    console.log(text);
  }
}

export default CorporationNLService;
