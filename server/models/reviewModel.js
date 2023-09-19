"use strict";
var { Sequelize, DataTypes } = require("sequelize");
var db = require("../db/database");
var UserModels = require("../models/userModel");
const Review = db.define("reviews", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: "TIMESTAMP",
        defaultValue: db.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    updated_at: {
        type: "TIMESTAMP",
        defaultValue: db.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    timestamps: false,
});
const ReviewPhoto = db.define("reviews_photos", {
    photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});
Review.hasMany(ReviewPhoto, { foreignKey: "review_id" });
Review.belongsTo(UserModels.User, { foreignKey: "user_id", as: "users" });
module.exports = { Review, ReviewPhoto };
