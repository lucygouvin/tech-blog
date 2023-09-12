const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Each user can have many Posts, and many Comments.
// Each Post can have many Comments.

User.hasMany(Post, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Post.belongsTo(User, {
    foreignKey: "userId",
});

User.hasMany(Comment, {
    onDelete: "CASCADE",
});

Comment.belongsTo(User);

Post.hasMany(Comment, {
    onDelete: "CASCADE",
});

Comment.belongsTo(Post);

module.exports = { User, Post, Comment };
