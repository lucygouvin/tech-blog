const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/view/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: { all: true, nested: true },
        });
        const plainPost = postData.get({ plain: true });
        res.render("postFull", { plainPost });
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

router.post("/comment/:id", async (req, res) => {
    try {
        await Comment.create({
            // TODO add in logged in user info
            userId: 1,
            postId: req.params.id,
            body: req.body.commentBody,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    res.status(200).json({ id: `${req.params.id}` });
});

module.exports = router;
