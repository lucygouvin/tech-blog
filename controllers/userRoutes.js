const router = require("express").Router();
const { User } = require("../models");

// CREATE new user
router.post("/", async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    res.status(200).send();
});

module.exports = router;
