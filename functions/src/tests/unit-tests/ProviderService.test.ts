import * as moment from "moment";
import CorporationNLService from "../../services/corporationnl-service";

test("Testing the date formatter", () => {
  const corporatienlService = new CorporationNLService();
  const receivedDate = moment("1996-05-10");
  const expectedDate = corporatienlService.formMoment("10 mei 1996");
  expect(expectedDate.unix()).toBe(receivedDate.unix());
});
