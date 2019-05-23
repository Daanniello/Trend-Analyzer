import * as moment from "moment";

import Provider from "../../utils/enums/provider-enum";
import ProviderService from "./provider-service";

/**
 * The service to scrape articles from CorporationNL
 */
class CorporatieNLService extends ProviderService {
  provider: Provider = Provider.CorporatieNL;

  getArticleDate(): moment.Moment {
    const articleDate = this.$(".o-panorama__content span")
      .text()
      .replace("/", "");
    moment.locale("nl");
    const articleMoment = moment(articleDate, "DD MMMM YYYY");
    return articleMoment;
  }

  getArticleTitle(): string {
    const title = this.$(".c-panorama__heading").text();
    return title;
  }

  getArticleText(): string {
    const text =
      this.$(".c-panorama__heading").text() +
      "\n" +
      this.$(".copy__intro p").text() +
      "\n" +
      this.$(".content").text();
    return text;
  }
}

export default CorporatieNLService;
