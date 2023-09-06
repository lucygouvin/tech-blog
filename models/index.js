const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Post.belongsTo(User, {
    foreignKey: "userId",
});

// Post.hasOne(User, {
//   onDelete: "CASCADE",
// });

// User.belongsTo(Post);

User.hasMany(Comment, {
    onDelete: "CASCADE",
});

Comment.belongsTo(User);

Post.hasMany(Comment, {
    onDelete: "CASCADE",
});

Comment.belongsTo(Post);

module.exports = { User, Post, Comment };
