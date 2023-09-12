const router = require("express").Router();
const { Post, User } = require("../models");

// GET all the posts in the database
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

// GET the login page
router.get("/login", (req, res) => {
    res.render("login");
});

// GET the signup page
router.get("/signup", (req, res) => {
    res.render("signup");
});

module.exports = router;
