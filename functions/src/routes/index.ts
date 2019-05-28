import * as express from "express";

/* API Router */
const router = express.Router();

/* Mount the routes to the router */
router.use("/ping", require("./ping"));
router.use("/analyze", require("./analyze"));
router.use("/general", require("./general"));
router.use("/topics", require("./topics"));
router.use("/categories", require("./categories"));
router.use("/login", require("./login"));

module.exports = router;
