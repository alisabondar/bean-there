var { Sequelize, DataTypes } = require("sequelize");
var db = require("../db/database");

var LocationModel = require("../models/locationModel");

const User = db.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    banner_photo: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT,
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

const Wishlist = db.define(
  "Wishlist",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visited: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { User, Wishlist };
