const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        });
        const plainPosts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", { plainPosts });
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
