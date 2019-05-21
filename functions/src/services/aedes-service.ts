import { Provider } from "../common/provider-enum";
import Article from "../models/article";
import ProviderService from "../services/ProviderService";
import * as moment from "moment";
import "moment/locale/nl";

/**
 * The service to scrape articles from Aedes
 */
class AedesService extends ProviderService {
  getText(url: string) {
    //console.log(date);
    const articleDate = this.$(".article__author").text();

    var words = articleDate.split(" ");
    console.log("nul2" + words[1]);

    console.log(words[3]);

    moment.locale("nl");

    const text =
      this.$("header h1").text() +
      "\n" +
      this.$(".intro").text() +
      "\n" +
      this.$(".article__text").text();

    // Call to Textrazor API for topics and categories
    //Recieve list of topics and list of categories
    const response = this.getTopicsAndCategories(text);
    const topics = response[0];
    const categories = response[1];

    const article = new Article(
      url,
      Provider.Aedes,
      this.$("header h1").text(),
      topics,
      categories,
      super.formMoment(articleDate).toDate()
    );

    console.log(text);
  }
}

export default AedesService;
