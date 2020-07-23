const router = require("express").Router();

const azulemexRoutes = require("./api/azulemexRoutes");
router.use("/api/scrap/azulemex", azulemexRoutes);

const gersaRoutes = require("./api/gersaRoutes");
router.use("/api/scrap/gersa", gersaRoutes);

const elsurtidorRoutes = require("./api/elsurtidorRoutes");
router.use("/api/scrap/elsurtidor", elsurtidorRoutes);

module.exports = router;
