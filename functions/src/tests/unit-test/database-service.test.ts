import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
import ArticleService from "../../services/database/article-service";
import UpdateService from "../../services/database/update-service";
import BlackListService from "../../services/database/blacklist-service";
import CredentialService from "../../services/database/credential-service";

import IArticle from "../../models/article-model";
import IUpdate from "../../models/update-model";
import IBlacklist from "../../models/blacklist-model";
import ICredential from "../../models/credential-model";

import Provider from "../../utils/enums/provider-enum";
import Collection from "../../utils/enums/collection-enum";

dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string)
  ),
  databaseURL: "https://trend-analyzer-5f614.firebaseio.com"
});

test("Test the firestore Article document", async () => {
  // Arrange
  const service = new ArticleService();

  const test: IArticle = {
    url: "testUrl",
    provider: Provider.Aedes,
    title: "testTitle",
    topics: [{ name: "testTopic", score: 100 }],
    categories: [],
    misc: [],
    mailOccurrences: [],
    timestamp: 1
  };

  // Act & Assert
  expect(service.collection).toBe(Collection.Articles);

  await service.set("testArticle", test);
  let result = await service.get("testArticle");

  expect(await service.get("dasd")).toBeUndefined();
  expect(result).toStrictEqual(test);

  expect(result.mailOccurrences.length).toBe(0);
  await service.incrementMailOccurence("testUrl", "testMail");
  result = await service.get("testArticle");
  expect(result.mailOccurrences.length).toBe(1);

  await service.set("testArticle", { timestamp: 326361 } as IArticle);
  result = await service.get("testArticle");
  expect(result.timestamp).toBe(326361);
  expect(result.url).toBe("testUrl");
  expect(result.title).toBe("testTitle");

  await service.updateArticle("testUrl", { title: "newTestTitle" } as IArticle);
  result = await service.get("testArticle");
  expect(result.title).toBe("newTestTitle");
  expect(result.topics[0]).toStrictEqual({ name: "testTopic", score: 100 });

  await service.setWithoutMerge("testArticle", { timestamp: 9871 } as IArticle);
  result = await service.get("testArticle");
  expect(result.timestamp).toBe(9871);
  expect(result.title).toBeUndefined();
  expect(result.url).toBeUndefined();

  await service.delete("testArticle");
  result = await service.get("testArticle");
  expect(result).toBeUndefined();
});

test("Test the firestore Updates document", async () => {
  // Arrange
  const service = new UpdateService();

  // Act & Assert
  expect(service.collection).toBe(Collection.Updates);

  await service.set("testTimestamp", { timestamp: 123 } as IUpdate);
  let result = await service.get("testTimestamp");

  expect(await service.get("dasd")).toBeUndefined();
  expect(result.timestamp).toBe(123);

  await service.set("testTimestamp", { timestamp: 321 } as IUpdate);
  result = await service.get("testTimestamp");
  expect(result.timestamp).toBe(321);

  await service.delete("testTimestamp");
  result = await service.get("testTimestamp");
  expect(result).toBeUndefined();
});

test("Test the firestore Blacklist document", async () => {
  // Arrange
  const service = new BlackListService();

  // Act & Assert
  expect(service.collection).toBe(Collection.Blacklists);

  await service.set("testBlacklist", {
    items: ["testItem1", "testItem2"]
  } as IBlacklist);
  let result = await service.get("testBlacklist");

  expect(await service.get("dasd")).toBeUndefined();
  expect(result.items).toStrictEqual(["testItem1", "testItem2"]);

  await service.set("testBlacklist", { items: [] });
  result = await service.get("testBlacklist");
  expect(result.items).toStrictEqual([]);

  await service.delete("testBlacklist");
  result = await service.get("testBlacklist");
  expect(result).toBeUndefined();
});

test("Test the firestore Credential document", async () => {
  // Arrange
  const service = new CredentialService();
  const test: ICredential = {
    email: "test@test.nl",
    pincode: "0000",
    apiKey: "KEY"
  };

  // Act & Assert
  expect(service.collection).toBe(Collection.Credentials);

  await service.set("testCredential", test);
  let result = await service.get("testCredential");

  expect(await service.get("dasd")).toBeUndefined();
  expect(result).toStrictEqual(test);

  await service.set("testCredential", { email: "newtestmail" } as ICredential);
  result = await service.get("testCredential");
  expect(result.email).toBe("newtestmail");
  expect(result.pincode).toBe("0000");
  expect(result.apiKey).toBe("KEY");

  await service.setWithoutMerge("testCredential", {
    pincode: "111111"
  } as ICredential);
  result = await service.get("testCredential");
  expect(result.email).toBeUndefined();
  expect(result.pincode).toBe("111111");
  expect(result.apiKey).toBeUndefined();

  await service.delete("testCredential");
  result = await service.get("testCredential");
  expect(result).toBeUndefined();
});
