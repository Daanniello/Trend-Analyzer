import * as express from "express";

// @ts-ignore
import * as articles from "../../articles.json";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", async (_req, res) => {
  res.send(articles);
});

module.exports = router;
