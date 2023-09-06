const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  confirmPassword(login) {
    return bcrypt.compare(login, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (signUpData) => {
        signUpData.password = await bcrypt.hash(signUpData.password, 10);
        return signUpData;
      },
    },

    sequelize,
    freezeTableName: true,
    modelName: "user",
  }
);

module.exports = User;
