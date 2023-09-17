"use strict";
var { Sequelize, DataTypes } = require("sequelize");
var db = require("../db/database");
const ChatRoom = db.define("chat_rooms", {
    chat_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});
const ChatMember = db.define("chat_members", {
    room_id: {
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
const Message = db.define("messages", {
    message_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    message_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room_id: {
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
}, { timestamps: false });
module.exports = { ChatRoom, ChatMember, Message };
