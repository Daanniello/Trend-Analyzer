import * as express from "express";

// @ts-ignore
import * as articles from "../../articles.json";
// import ArticleService from "../services/database/article-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", async (_req, res) => {
  res.send(articles);
  // console.time("RETRIEVING ARTICLES");
  // const service = new ArticleService();
  // res.send(await service.getAll());
  // console.timeEnd("RETRIEVING ARTICLES");
});

module.exports = router;
