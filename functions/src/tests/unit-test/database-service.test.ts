// const test = require('firebase-functions-test')();
import ArticleService from "../../services/database/article-service";
// import * as test from "firebase-functions-test";

// firebase.initializeAdminApp({ projectId: "test-project" }).firestore();

test("Test the firestore", async () => {
  // Arrange
  const service = new ArticleService();

  // Act & Assert
  await service.get("");
  // expect(articles.length).toBe(0);
});
