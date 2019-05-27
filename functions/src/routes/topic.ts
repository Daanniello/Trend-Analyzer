import * as express from "express";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.get("", (req, res) => {
  res.send("Topic page");
});

module.exports = router;
