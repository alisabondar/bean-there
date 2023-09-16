"use strict";
var { Sequelize, DataTypes } = require("sequelize");
var db = require("../db/database");
const User = db.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    banner_photo: {
        type: DataTypes.STRING,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false,
});
module.exports = User;
