const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql", // or 'postgres'
});

const Person = sequelize.define("Person", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = { Person };
