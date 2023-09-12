const router = require("express").Router();
const { Post, Comment } = require("../models");

// GET the view of a single post, by id
router.get("/view/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: { all: true, nested: true },
        });
        const plainPost = postData.get({ plain: true });
        res.render("postFull", {
            plainPost,
            loggedIn: req.session.loggedIn,
            user: req.session.user,
            author: postData.userId === req.session.userid,
        });
    } catch (err) {
        res.json(err);
    }
});

// POST a comment to a specific post, by the post's id
router.post("/comment/:id", async (req, res) => {
    try {
        await Comment.create({
            userId: req.session.userid,
            postId: req.params.id,
            body: req.body.commentBody,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    res.status(200).json({ id: `${req.params.id}` });
});

// GET the page to allow the user to edit a specific post
router.get("/edit/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: { all: true, nested: true },
        });
        const plainPost = postData.get({ plain: true });
        res.render("editPost", {
            plainPost,
            loggedIn: req.session.loggedIn,
            user: req.session.user,
            author: postData.userId === req.session.userid,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT the updated post data, updating the existing post object
router.put("/edit/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        await postData.update({
            title: req.body.newTitle,
            body: req.body.newBody,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    res.status(200).send();
});

// DELETE the post, by id
router.delete("/delete/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        await postData.destroy();
    } catch (err) {
        res.status(500).json(err);
    }
    res.status(200).send();
});
module.exports = router;
