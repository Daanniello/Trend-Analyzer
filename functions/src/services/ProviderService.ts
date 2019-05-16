abstract class ProviderService {
  protected getMonth(month: any): string {
    const monthArray: any = {
      januari: "1",
      january: "1",
      februari: "2",
      february: "2",
      maart: "3",
      march: "3",
      april: "4",
      mei: "5",
      may: "5",
      juni: "6",
      june: "6",
      juli: "7",
      july: "7",
      augustus: "8",
      august: "8",
      september: "9",
      oktober: "10",
      october: "10",
      november: "11",
      december: "12"
    };

    var monthNumber = "";

    for (var key in monthArray) {
      if (key == month) {
        monthNumber = monthArray[key];
      }
    }
    return monthNumber;
  }
}

export default ProviderService;
