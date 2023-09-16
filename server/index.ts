import { Request, Response } from "express";

require("dotenv").config();
var morgan = require("morgan");
var colors = require("colors");
var express = require("express");
var userRoutes = require("./routes/user");
var messengerRoutes = require("./routes/messenger");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => res.send("bean-there"));

app.use("/user", userRoutes);
app.use("/messenger", messengerRoutes);

/**
 * /messenger
 *  GET /rooms/:userId (the userId needs to be sent with this, in params)
 * then
 *  look up every room the member is a part of [chat_members | chat_rooms ]
 *  return list of room names (and Id so you can get the messages later)
 *
 *  GET /rooms/:roomId/messages/
 * then
 *  look up every message with the roomId [messages]
 *  return messages
 *
 *
 *  POST /rooms/ (in the body send a list of users in the room)
 * then
 *  create a new room => grab that room id
 *  create a row in chat_members for each user with that room_id and that user's_id
 *
 *  POST /rooms/:roomId/messages { send roomId, in params, send the user who send the message (i guess in case yourself) }
 * then
 *  create a row in messages for that specific room_id
 *
 */

const port = process.env.PORT || 5001;

var db = require("./db/database");
//test
db.authenticate()
  .then(() => {
    console.log(
      (colors.yellow as any)("Connection has been established successfully.")
    );
    app.listen(port, () =>
      console.log((colors.green as any)(`Server connected on port ${port}`))
    );
  })
  .catch((error: Error) => {
    console.log(
      (colors.red as any)("Unable to connect to the database:", error)
    );
  });
