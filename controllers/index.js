const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const postRoutes = require("./postRoutes");

router.use("/", homeRoutes);

module.exports = router;
