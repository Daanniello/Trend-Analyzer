import * as express from "express";

import ArticleService from "../services/database/article-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", async (req, res) => {
  console.time("RETRIEVING ARTICLES");
  const service = new ArticleService();
  res.send(await service.getAll());
  console.timeEnd("RETRIEVING ARTICLES");
});

module.exports = router;
