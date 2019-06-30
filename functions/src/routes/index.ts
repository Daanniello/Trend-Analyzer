import * as express from "express";

/* API Router */
const router = express.Router();

/* Mount the routes to the router */
// router.use("/general", require("./general"));
// router.use("/topics", require("./topics"));
// router.use("/categories", require("./categories"));
router.use("/analyze", require("./analyze"));
router.use("/login", require("./login"));
router.use("/blacklist", require("./blacklist"));
router.use("/articles", require("./articles"));
router.use("/mail", require("./mail"));
router.use("/reset", require("./reset"));
router.use("/pincode", require("./pincode"));
router.use("/customtrends", require("./customtrends"));

module.exports = router;
