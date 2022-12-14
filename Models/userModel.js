const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionDB").sequelize;

const user = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    email:{
      type: DataTypes.STRING,
      // unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = user;
