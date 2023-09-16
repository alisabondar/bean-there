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
var User = require("../models/userModel");
var getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * send userId as a param or (or some other way)
     * look up every room the member is a part of and return those rooms
     * via the [users | chat_members | chat_rooms] tables
     *
     * return list of roomName and their roomId (for message lookup later)
     */
    // testing get rooms
    const userId = req.params.userId;
    yield ChatRoom.findAll({
        where: {
            id: {
                [Op.in]: Sequelize.literal(`(SELECT room_id FROM chat_members WHERE user_id = ${userId})`),
            },
        },
    })
        .then((results) => {
        const roomList = results.map((result) => result.dataValues);
        // console.log(results.map((result) => result.dataValues));
        res.status(200).send({
            mssg: "you have reached the getRooms controller",
            rooms: roomList,
        });
    })
        .catch((error) => {
        console.log(error);
        res.status(404).send({ error: "unable to login user" });
    });
});
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
        const userIdArray = yield User.findAll({
            where: {
                username: members,
            },
            attributes: ["id"], // Select only the 'id' column
        }).then((userIdArray) => __awaiter(void 0, void 0, void 0, function* () {
            const chatMemberArray = userIdArray.map((user) => {
                return { user_id: user.id, room_id: roomId };
            });
            yield ChatMember.bulkCreate(chatMemberArray).then((results) => {
                console.log(results);
                res.status(201).send({ mssg: "successfully created room" });
            });
        }));
    }))
        .catch((error) => {
        console.log(error);
        res.status(404).send({ error: "unable to create a room" });
    });
});
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
    Message.create({ message_text, message_user, room_id })
        .then((message) => {
        // console.log(message);
        res.status(200).send({
            mssg: "you have reached the addMessage controller",
            message: message.dataValues,
        });
    })
        .catch((error) => {
        console.log(error);
        res.status(404).send({ error: "unable to create message" });
    });
});
module.exports = { getRooms, getMessages, addRoom, addMessage };
