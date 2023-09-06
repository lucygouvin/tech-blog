const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");

router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ all: true }],
        });
        const plainPost = postData.get({ plain: true });
        res.render("postFull", { plainPost });
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
