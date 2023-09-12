const router = require("express").Router();
const { Post } = require("../models");

// GET all the posts that the logged in user has made
router.get("/", async (req, res) => {
    try {
        if (req.session.userid) {
            const postData = await Post.findAll({
                where: {
                    userId: req.session.userid,
                },
            });
            const plainPosts = postData.map((post) =>
                post.get({ plain: true })
            );
            res.render("dashboard", {
                plainPosts,
                loggedIn: req.session.loggedIn,
            });
        } else {
            res.render("dashboard", {
                loggedIn: req.session.loggedIn,
            });
        }
    } catch (err) {
        res.status(500).json(err);

    }
});

// GET the new post page
router.get("/new", (req, res) => {
    res.render("newPost", { loggedIn: req.session.loggedIn });
});

// POST the new post, save it to the database
router.post("/new", async (req, res) => {
    try {
        await Post.create({
            userId: req.session.userid,
            title: req.body.postTitle,
            body: req.body.postBody,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    res.status(200).send();
});
module.exports = router;
