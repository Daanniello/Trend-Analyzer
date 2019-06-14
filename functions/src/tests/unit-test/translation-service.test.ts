import Translator from "../../services/api/translation-service";
const trans = new Translator();

test("Test the translate function", async () => {
  const dutchString = "Ik ben op de fiets";
  const gerString = "Ich bin auf dem Fahrrad";
  const fraString = "Je suis sur le vélo";

  // Test if the translations
  expect(await trans.translate(dutchString)).toBe("I'm on the bike");
  expect(await trans.translate(gerString)).toBe("I'm on the bike");
  expect(await trans.translate(fraString)).toBe("I'm on the bike");
});

test("Test the text dividing function", () => {
  const text =
    "Jouw werk neemt toe en wordt complexer omdat er steeds meer kwetsbare bewoners zijn. Om te voorkomen dat dit probleem groter wordt, moet je het van een andere kant bekijken. Want kwetsbare bewoners zijn een kans om jouw werkdruk te verlagen en buurten beter te maken. Bezoek dit event en leer van anderen hoe je dit aanpakt. Door het probleem van kwetsbare bewoners om te draaien levert het jou voordelen op. Dan kost het je minder tijd, wordt de sociale samenhang groter en jouw werk wordt leuker. Denk bijvoorbeeld aan de rol die de kwetsbare bewoner kan spelen in het creëren van een prettige leefomgeving. Of werk samen met bewoners om de veiligheid in de buurt te verbeteren. De praktijk toont aan dit voor iedereen haalbaar is, als je maar de juiste stappen zet. Wat je kunt verwachten Dit event biedt jou de handreikingen en beste voorbeelden uit de praktijk. Je zult zelf ervaren hoe je gebruik kunt maken van de kracht van kwetsbaarheid. Andere organisaties vertellen hoe zij dit hebben aangepakt en wat het heeft opgeleverd. En jij krijgt concrete aanpakken en tips voor jouw situatie. Jouw event Werk je op het gebied van wonen, maatschappelijke ontwikkelingen, het sociale domein, vastgoed, leefbaarheid, veiligheid, zorg, toezicht of handhaving? Dan is dit event belangrijk voor jou. omdat er steeds meer kwetsbare bewoners zijn. Om te voorkomen dat dit probleem groter wordt, moet je het van een andere kant bekijken. Want kwetsbare bewoners zijn een kans om jouw werkdruk te verlagen en buurten beter te maken. Bezoek dit event en leer van anderen hoe je dit aanpakt. Door het probleem van kwetsbare bewoners om te draaien levert het jou voordelen op. Dan kost het je minder tijd, wordt de sociale samenhang groter en jouw werk wordt leuker. Denk bijvoorbeeld aan de rol die de kwetsbare bewoner kan spelen in het creëren van een prettige leefomgeving. Of werk samen met bewoners om de veiligheid in de buurt te verbeteren. De praktijk toont aan dit voor iedereen haalbaar is, als je maar de juiste stappen zet. Wat je kunt verwachten Dit event biedt jou de handreikingen en beste voorbeelden uit de praktijk. Je zult zelf ervaren hoe je gebruik kunt maken van de kracht van kwetsbaarheid. Andere organisaties vertellen hoe zij dit hebben aangepakt en wat het heeft opgeleverd. En jij krijgt concrete aanpakken en tips voor jouw situatie. Jouw event Werk je op het gebied van wonen, maatschappelijke ontwikkelingen, het sociale domein, vastgoed, leefbaarheid, veiligheid, zorg, toezicht of handhaving? Dan is dit event belangrijk voor jou. omdat er steeds meer kwetsbare bewoners zijn. Om te voorkomen dat dit probleem groter wordt, moet je het van een andere kant bekijken. Want kwetsbare bewoners zijn een kans om jouw werkdruk te verlagen en buurten beter te maken. Bezoek dit event en leer van anderen hoe je dit aanpakt. Door het probleem van kwetsbare bewoners om te draaien levert het jou voordelen op. Dan kost het je minder tijd, wordt de sociale samenhang groter en jouw werk wordt leuker. Denk bijvoorbeeld aan de rol die de kwetsbare bewoner kan spelen in het creëren van een prettige leefomgeving. Of werk samen met bewoners om de veiligheid in de buurt te verbeteren. De praktijk toont aan dit voor iedereen haalbaar is, als je maar de juiste stappen zet. Wat je kunt verwachten Dit event biedt jou de handreikingen en beste voorbeelden uit de praktijk. Je zult zelf ervaren hoe je gebruik kunt maken van de kracht van kwetsbaarheid. Andere organisaties vertellen hoe zij dit hebben aangepakt en wat het heeft opgeleverd. En jij krijgt concrete aanpakken en tips voor jouw situatie. Jouw event Werk je op het gebied van wonen, maatschappelijke ontwikkelingen, het sociale domein, vastgoed, leefbaarheid, veiligheid, zorg, toezicht of handhaving? Dan is dit event belangrijk voor jou. omdat er steeds meer kwetsbare bewoners zijn. Om te voorkomen dat dit probleem groter wordt, moet je het van een andere kant bekijken. Want kwetsbare bewoners zijn een kans om jouw werkdruk te verlagen en buurten beter te maken. Bezoek dit event en leer van anderen hoe je dit aanpakt. Door het probleem van kwetsbare bewoners om te draaien levert het jou voordelen op. Dan kost het je minder tijd, wordt de sociale samenhang groter en jouw werk wordt leuker. Denk bijvoorbeeld aan de rol die de kwetsbare bewoner kan spelen in het creëren van een prettige leefomgeving. Of werk samen met bewoners om de veiligheid in de buurt te verbeteren. De praktijk toont aan dit voor iedereen haalbaar is, als je maar de juiste stappen zet. Wat je kunt verwachten Dit event biedt jou de handreikingen en beste voorbeelden uit de praktijk. Je zult zelf ervaren hoe je gebruik kunt maken van de kracht van kwetsbaarheid. Andere organisaties vertellen hoe zij dit hebben aangepakt en wat het heeft opgeleverd. En jij krijgt concrete aanpakken en tips voor jouw situatie. Jouw event Werk je op het gebied van wonen, maatschappelijke ontwikkelingen, het sociale domein, vastgoed, leefbaarheid, veiligheid, zorg, toezicht of handhaving? Dan is dit event belangrijk voor jou.";
  const dividedTest: any = trans.divideText(text);
  const part1 = dividedTest[0];
  const part2 = dividedTest[1];
  const part3 = dividedTest[2];
  const part4 = dividedTest[3];

  const part1Arr = dividedTest[0].split(" ");
  const part2Arr = dividedTest[1].split(" ");
  const part3Arr = dividedTest[2].split(" ");
  const part4Arr = dividedTest[3].split(" ");

  // Validate that the divided strings are smaller than 1400 characters so that they can be used as input for the translate api
  expect(part1.length < 1400).toBe(true);
  expect(part2.length < 1400).toBe(true);
  expect(part3.length < 1400).toBe(true);
  expect(part4.length < 1400).toBe(true);

  // Make sure that the strings end with a word
  expect(part1Arr[part1Arr.length - 1]).toBe("jou.");
  expect(part2Arr[part2Arr.length - 1]).toBe("bewoners");
  expect(part3Arr[part3Arr.length - 1]).toBe("probleem");
  expect(part4Arr[part4Arr.length - 1]).toBe("jou");
});
