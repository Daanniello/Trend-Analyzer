import { Provider } from "../common/provider-enum";
import Article from "../models/article";
import ProviderService from "../services/ProviderService";
import * as moment from "moment";
import "moment/locale/nl";

class CorporationNLService extends ProviderService {
  getText(url: string) {
    //console.log(date);
    const articleDate = this.$(".o-panorama__content span")
      .text()
      .replace("/", "");

    var words = articleDate.split(" ");
    console.log("nul2" + words[1]);

    console.log(words[3]);

    moment.locale("nl");

    const article = new Article(
      url,
      Provider.CorporatieNL,
      this.$(".c-panorama__heading").text(),
      this.$(".copy__intro p").text(),
      this.$(".content").text(),
      super.formDate(articleDate)
    );

    console.log(article.coretext);
  }
}

export default CorporationNLService;