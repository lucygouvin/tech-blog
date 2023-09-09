const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/:id", async (req, res) => {
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

router.post("/:id", async (req, res) => {
    try {
        // TODO add in logged in user info"
        const { cText } = req.body;
        const newComment = {
            userId: 1,
            postId: req.params.id,
            body: cText,
        };

        await Comment.create(newComment);
        res.redirect(`/post/${req.params.id}`);
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
