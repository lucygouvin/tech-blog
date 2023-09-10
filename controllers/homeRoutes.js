const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        });
        const plainPosts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", { plainPosts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.json(err);
    }
});

router.get("/login", (req, res) => {
    req.session.loggedIn = true;
    req.session.save();
    console.log("logged in");
    console.log(req.session.cookie);
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

module.exports = router;
