const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
    {
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dateUpdated: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: false,
        freezeTableName: true,
        modelName: "comment",
    }
);

module.exports = Comment;
