import * as express from "express";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", (req, res) => {
  res.send("Analyze");
});

module.exports = router;
