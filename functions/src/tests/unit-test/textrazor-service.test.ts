// import textRazor from "../../services/api/textrazor-service";
// import IRawArticle from "../../models/raw-article-model";
// import ProviderService from "../../services/provider/provider-service";
// import Provider from "../../utils/enums/provider-enum";
// import { raw } from "body-parser";

// // TODO: Tests to be written
// // TODO: FilterJSON
// // TODO: Form Categories
// // TODO: Form Topics
// // TODO: Get unique categories

// // Test the FilterJSON function
// test("Test the FilterJSON function", async () => {
//   const service = new textRazor();

//   //Arrange
//   const rawArticle: IRawArticle = {
//     url:
//       "https://www.corporatienl.nl/artikelen/is-een-volledig-digitale-corporatie-wenselijk/",
//     provider: Provider.CorporatieNL,
//     title: "Is een volledige digitale corporatie wenselijk?",
//     text: "Dit is de dummy text!",
//     timestamp: Date.now()
//   };

//   const testJSON = {
//     response: {
//       topics: [
//         {
//           id: 0,
//           label: "Digital preservation",
//           wikiLink: "http://en.wikipedia.org/Category:Digital_preservation",
//           score: 0.502,
//           wikidataId: "Q632897"
//         }
//       ]
//     }
//   };

//   // Act
//   const article = service.filterJSON(testJSON, rawArticle);
//   // Assert
// });
