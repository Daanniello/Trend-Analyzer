import Provider from "../../utils/enums/provider-enum";
import ProviderService from "./provider-service";
import * as moment from "moment";
import "moment/locale/nl";

/**
 * The service to scrape articles from Aedes
 */
class AedesService extends ProviderService {
  protected provider: Provider = Provider.Aedes;

  protected getArticleDate(): moment.Moment {
    const articleDate = this.$(".article__author").text();
    moment.locale("nl");
    const articleMoment = moment(articleDate, "D MMMM YYYY");
    return articleMoment;
  }

  protected getArticleTitle(): string {
    const title = this.$("header h1").text();
    return title;
  }

  protected getArticleText(): string {
    const text =
      this.$("header h1").text() +
      "\n" +
      this.$(".intro").text() +
      "\n" +
      this.$(".article__text").text();
    return text;
  }
}

export default AedesService;
