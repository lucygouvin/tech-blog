const router = require("express").Router();
const { User } = require("../models");

// CREATE new user
router.post("/", async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.user = newUser.username;
        req.session.userid = newUser.id;
        req.session.save();
    } catch (err) {
        res.status(500).json(err);
    }
    req.session.loggedIn = true;

    req.session.save();
    res.status(200).send();
});

// Log in
router.post("/login", async (req, res) => {
    try {
        const dbUser = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUser) {
            res.status(400).json({
                message: "Incorrect username or password, please try again.",
            });
            return;
        }

        const verifyPassword = await dbUser.confirmPassword(req.body.password);

        if (!verifyPassword) {
            res.status(400).json({
                message: "Incorrect username or password, please try again.",
            });
            return;
        }

        req.session.loggedIn = true;
        req.session.user = dbUser.username;
        req.session.userid = dbUser.id;
        req.session.save();
        res.status(200).send();
    } catch (err) {
        res.status(500).json(err);
    }
});

// Log out
router.post("/logout", async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
