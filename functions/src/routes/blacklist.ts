import * as express from "express";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", async (req, res) => {
  const blacklistItem = req.header("blacklistItem");

  return res.send({ succes: true });
});

module.exports = router;
