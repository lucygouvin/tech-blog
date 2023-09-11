const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
    // TODO: only get posts of logged in user
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
        console.log(err);
    }
});

router.get("/new", (req, res) => {
    res.render("newPost", { loggedIn: req.session.loggedIn });
});

router.post("/new", async (req, res) => {
    try {
        await Post.create({
            userId: req.session.userid,
            title: req.body.postTitle,
            body: req.body.postBody,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    res.status(200).send();
});
module.exports = router;
