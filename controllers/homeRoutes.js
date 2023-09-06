const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ all: true }],
    });

    const plainPosts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { plainPosts });
  } catch (err) {
    res.json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
module.exports = router;
