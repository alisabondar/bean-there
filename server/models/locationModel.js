"use strict";
var { Sequelize, DataTypes } = require("sequelize");
var db = require("../db/database");
var LocationModel = db.define("Location", {
    place_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, { timestamps: false });
module.exports = { LocationModel };
// https://picsum.photos/900/400'
