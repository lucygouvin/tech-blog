const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userSeedData = require("./userData.json");
const postSeedData = require("./postData.json");
const commentSeedData = require("./commentData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(postSeedData, {
        returning: true,
    });

    await Comment.bulkCreate(commentSeedData, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
