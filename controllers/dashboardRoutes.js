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
        // TODO add in logged in user info
        const { titleContent, bodyContent } = req.body;
        const newPost = {
            userId: 1,
            title: titleContent,
            body: bodyContent,
        };
        await Post.create(newPost);
        res.redirect(`/post/view/2`);
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
