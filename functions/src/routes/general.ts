import * as express from "express";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", (req, res) => {
  res.send("General page");
});

module.exports = router;
