const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");

// Use the appropriate routers for each path
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/post", postRoutes);
router.use("/user", userRoutes);

module.exports = router;
