import { Request, Response } from "express";
const Sequelize = require("sequelize");
const { Op } = Sequelize;

var { ChatRoom, ChatMember, Message } = require("../models/messengerModel");
var { User } = require("../models/userModel");

var db = require("../db/database");

// get rooms for user based on a userId
var getRooms = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const roomsList = await ChatRoom.findAll({
      attributes: ["id"],
      where: {
        id: {
          [Op.in]: Sequelize.literal(
            `(SELECT room_id FROM chat_members WHERE user_id = ${userId})`
          ),
        },
      },
      raw: true,
    });

    const roomIds = roomsList.map((room: { id: number }) => room.id);

    const roomsWithMembers = await ChatRoom.findAll({
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
    res.status(200).send({
      mssg: "you have reached the getRooms controller",
      rooms: roomsWithMembers,
    });
  } catch (error) {
    res.status(404).send({ error: "unable to login user" });
  }
};

// get messages for a room based on a roomId
var getMessages = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;

  await Message.findAll({
    where: { room_id: roomId },
  })
    .then((results: { dataValues: object }[]) => {
      const messagesList = results.map((result) => result.dataValues);
      res.status(200).send({
        mssg: "you have reached the getMessages controller",
        messages: messagesList,
      });
    })
    .catch((error: Error) => {
      res.status(404).send({ error: "unable to get messages" });
    });
};

// add a room for a user based on their user_name and associated members
var addRoom = async (req: Request, res: Response) => {
  const { chat_name, members } = req.body;

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

  await ChatRoom.create({ chat_name })
    .then((room: { dataValues: { id: number } }) => {
      const room_id = room.dataValues.id;
      return room_id;
    })
    .then(async (roomId: number) => {
      // YOU CAN REFACTOR THIS TO BE MUCH BETTER IF YOU ARE ABLE TO CAPTURE
      // EACH MEMBERS ID IN THE REQ.BODY INSTEAD OF FINDING IT WITH THIS QUERY
      // AT A TIME
      await User.findAll({
        where: {
          username: members,
        },
        attributes: ["id"], // Select only the 'id' column
      }).then(async (userIdArray: []) => {
        const chatMemberArray = userIdArray.map((user: { id: number }) => {
          return { user_id: user.id, room_id: roomId };
        });

        await ChatMember.bulkCreate(chatMemberArray).then((results: any) => {
          res.status(201).send({
            mssg: "successfully created room",
          });
        });
      });
    })
    .catch((err: Error) => {
      const error = err.message || "internal server error";
      res.status(404).send({ error });
    });
};

// add a messaged based on a room_id and a message object
var addMessage = async (req: Request, res: Response) => {
  const room_id = req.params.roomId;
  const { message_text, message_user } = req.body;

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
    .then((message: { dataValues: object }) => {
      res.status(200).send({
        mssg: "you have reached the addMessage controller",
        message: message.dataValues,
      });
    })
    .catch((err: Error) => {
      const error = err.message || "internal server error";
      res.status(404).send({ error });
    });
};

module.exports = { getRooms, getMessages, addRoom, addMessage };
