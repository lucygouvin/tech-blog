const router = require("express").Router();
const { Post, Comment, User } = require("../models");

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
        console.log(err);
        res.json(err);
    }
});

router.post("/comment/:id", async (req, res) => {
    try {
        await Comment.create({
            userId: req.session.userid,
            postId: req.params.id,
            body: req.body.commentBody,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    res.status(200).json({ id: `${req.params.id}` });
});

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
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        await postData.update({
            title: req.body.newTitle,
            body: req.body.newBody,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    res.status(200).send();
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        await postData.destroy();
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    res.status(200).send();
});
module.exports = router;
