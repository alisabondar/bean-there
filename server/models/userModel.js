"use strict";
var { Sequelize, DataTypes } = require("sequelize");
var db = require("../db/database");
var LocationModel = require("../models/locationModel");
const User = db.define("users", {
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
}, {
    timestamps: false,
});
const Wishlist = db.define("wishlists", {
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
}, {
    timestamps: false,
});
const Friend = db.define("friends", {
    friend_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});
Friend.belongsTo(User, { foreignKey: "friend_id", as: "users" });
module.exports = { User, Wishlist, Friend };
