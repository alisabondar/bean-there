"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const { Op } = Sequelize;
var { ChatRoom, ChatMember, Message } = require("../models/messengerModel");
var { User } = require("../models/userModel");
var db = require("../db/database");
// get rooms for user based on a userId
var getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * send userId as a param or (or some other way)
     * look up every room the member is a part of and return those rooms
     * via the [users | chat_members | chat_rooms] tables
     *
     * return list of roomName and their roomId (for message lookup later)
     */
    // testing get rooms
    try {
        const userId = req.params.userId;
        const roomsList = yield ChatRoom.findAll({
            attributes: ["id"],
            where: {
                id: {
                    [Op.in]: Sequelize.literal(`(SELECT room_id FROM chat_members WHERE user_id = ${userId})`),
                },
            },
            raw: true,
        });
        const roomIds = roomsList.map((room) => room.id);
        const roomsWithMembers = yield ChatRoom.findAll({
            attributes: ["id", "chat_name"],
            include: [
                {
                    model: ChatMember,
                    attributes: ["user_id"],
                    where: {
                        room_id: roomIds,
                    },
                    include: {
                        model: User,
                        as: "users",
                        attributes: ["username", "photo"],
                    },
                },
            ],
        });
        // console.log(roomsWithMembers);
        res.status(200).send({
            mssg: "you have reached the getRooms controller",
            rooms: roomsWithMembers,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ error: "unable to login user" });
    }
});
// get messages for a room based on a roomId
var getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * send roomId with request somehow (params, etc...)
     * return all messages from [messages]
     */
    // testing get rooms
    const roomId = req.params.roomId;
    yield Message.findAll({
        where: { room_id: roomId },
    })
        .then((results) => {
        const messagesList = results.map((result) => result.dataValues);
        res.status(200).send({
            mssg: "you have reached the getMessages controller",
            messages: messagesList,
        });
    })
        .catch((error) => {
        console.log(error);
        res.status(404).send({ error: "unable to get messages" });
    });
});
// add a room for a user based on their user_name and associated members
var addRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /** send a list of users via req.body and a chatname
     *  create a new room => grab that room id
     *  create a row in chat_members for each user with that room_id and that user's_id
     */
    //  here i assume chat_name is a string, and members is an array of strings
    const { chat_name, members } = req.body;
    /**
     * my sample req.body
     *
     * {
     * "chat_name": "Weebs R Us",
     * "members": ["user2", "user4", "user6"]
     * }
     */
    // some light validation
    if (!chat_name) {
        return res.status(404).send({ error: "please enter a chat name" });
    }
    if (!Array.isArray(members)) {
        return res
            .status(404)
            .send({ error: "please let us know which members are in the chat" });
    }
    if (members.length < 2) {
        return res
            .status(404)
            .send({ error: "please add at least two members to the chat" });
    }
    yield ChatRoom.create({ chat_name })
        .then((room) => {
        // the id of the room created should be room.dataValues.id
        const room_id = room.dataValues.id;
        return room_id;
    })
        .then((roomId) => __awaiter(void 0, void 0, void 0, function* () {
        // YOU CAN REFACTOR THIS TO BE MUCH BETTER IF YOU ARE ABLE TO CAPTURE
        // EACH MEMBERS ID IN THE REQ.BODY INSTEAD OF FINDING IT WITH THIS QUERY
        // AT A TIME
        yield User.findAll({
            where: {
                username: members,
            },
            attributes: ["id"], // Select only the 'id' column
        }).then((userIdArray) => __awaiter(void 0, void 0, void 0, function* () {
            const chatMemberArray = userIdArray.map((user) => {
                return { user_id: user.id, room_id: roomId };
            });
            yield ChatMember.bulkCreate(chatMemberArray).then((results) => {
                // console.log(results);
                res.status(201).send({
                    mssg: "successfully created room",
                });
            });
        }));
    }))
        .catch((err) => {
        const error = err.message || "internal server error";
        res.status(404).send({ error });
    });
});
// add a messaged based on a room_id and a message object
var addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * send roomId, in params
     * send the user who send the message (i guess in case yourself)
     * create a row in messages for that specific room_id */
    // console.log(req.params);
    // console.log(req.body);
    /**
     * sample linK: http://localhost:5000/messenger/rooms/1/messages/
     *
     * sample body:
     * {
     * "message_text": "I can't wait to go to the land of the rising sun!",
     * "message_user": 1 (this is the user id)
     * }
     */
    const room_id = req.params.roomId;
    const { message_text, message_user } = req.body;
    // light validation
    if (!room_id) {
        return res.status(404).send({ error: "please select a room" });
    }
    if (!message_text) {
        return res.status(404).send({ error: "please enter a message" });
    }
    if (!message_user) {
        return res.status(404).send({ error: "error send a user's message" });
    }
    Message.create({ message_text, message_user, room_id })
        .then((message) => {
        // console.log(message);
        res.status(200).send({
            mssg: "you have reached the addMessage controller",
            message: message.dataValues,
        });
    })
        .catch((err) => {
        const error = err.message || "internal server error";
        res.status(404).send({ error });
    });
});
module.exports = { getRooms, getMessages, addRoom, addMessage };
