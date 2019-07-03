import * as express from "express";

import ArticleService from "../services/database/article-service.js";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", async (_req, res) => {
  const service = new ArticleService();
  const articles = await service.getAll();
  res.send(articles);
});

module.exports = router;
