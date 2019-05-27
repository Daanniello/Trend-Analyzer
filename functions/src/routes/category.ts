import * as express from "express";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", (req, res) => {
  res.send("Category page");
});

module.exports = router;
