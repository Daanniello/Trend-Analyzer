import * as moment from "moment";

abstract class ProviderService {
  formDate(date: any): Date {
    var words = date.split(" ");

    moment.locale("nl");

    return new Date(
      words[3] +
        "-" +
        moment()
          .month(words[2])
          .format("MM") +
        "-" +
        words[1]
    );
  }
}

export default ProviderService;
