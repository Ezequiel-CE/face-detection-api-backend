const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  mail: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING(1024), allowNull: false },
});

module.exports = User;
