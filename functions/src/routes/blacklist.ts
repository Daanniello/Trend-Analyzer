import * as express from "express";

import BlacklistService from "../services/database/blacklist-service";
import IBlacklist from "../models/blacklist-model";

/* Ping Router */
const router = express.Router();

const DOCUMENT_ID = "blacklist";

/* Implement endpoints */
router.get("", async (req, res) => {
  try {
    const service = new BlacklistService();
    const item = await service.get(DOCUMENT_ID);
    return res.send(item);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.post("", async (req, res) => {
  const items = req.body.items;
  if (!items) return res.sendStatus(400);

  try {
    const blacklist: IBlacklist = {
      items: items
    };

    const service = new BlacklistService();
    await service.setWithoutMerge(DOCUMENT_ID, blacklist);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
