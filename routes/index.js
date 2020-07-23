const router = require("express").Router();

const azulemexRoutes = require("./api/azulemexRoutes");
router.use("/api/scrap/azulemex", azulemexRoutes);

module.exports = router;
