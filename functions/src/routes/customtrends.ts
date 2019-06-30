import * as express from "express";

import CustomTrendService from "../services/database/customtrend-service";
import ICustomTrend from "../models/customtrend-model";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */

router.post("", async (req, res) => {
  const trend = req.body as ICustomTrend;
  if (!trend) return res.sendStatus(400);

  try {
    const service = new CustomTrendService();
    const existingTrend = await service.get(trend.name);
    if (existingTrend) res.sendStatus(400);
    await service.set(trend.name, trend);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("", async (req, res) => {
  try {
    const service = new CustomTrendService();
    const trends = await service.getAll();
    return res.send(trends);
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = router;
