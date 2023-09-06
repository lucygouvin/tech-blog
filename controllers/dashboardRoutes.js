const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", (req, res) => {
    res.render("test", { text: "dashboard" });
});

module.exports = router;
