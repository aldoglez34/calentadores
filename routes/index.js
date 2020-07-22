const router = require("express").Router();

const scrapRoutes = require("./api/scrapRoutes");
router.use("/api/scrap", scrapRoutes);

module.exports = router;
