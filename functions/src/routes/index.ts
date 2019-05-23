import * as express from "express";

/* API Router */
const router = express.Router();

/* Mount the routes to the router */
router.use("/ping", require("./ping"));
router.use("/analyze", require("./analyze"));

module.exports = router;
