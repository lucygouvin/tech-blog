const router = require("express").Router();
const { Post } = require("../models");

router.get("/", async (req, res) => {
    // TODO: only get posts of logged in user
    try {
        const postData = await Post.findAll();
        const plainPosts = postData.map((post) => post.get({ plain: true }));

        res.render("dashboard", { plainPosts });
    } catch (err) {
        console.log(err);
    }
});

router.get("/new", (req, res) => {
    res.render("newPost");
});

router.post("/new", async (req, res) => {
    try {
        await Post.create({
            // TODO: add logged in user info
            userId: 1,
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
