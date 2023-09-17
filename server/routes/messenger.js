"use strict";
var express = require("express");
var router = express.Router();
var { getRooms, getMessages, addRoom, addMessage, } = require("../controllers/messengerController");
// all these endpoints start with /messenger/rooms*
router.get("/user/:userId", getRooms);
router.get("/:roomId/messages/", getMessages);
router.post("/add", addRoom);
router.post("/:roomId/messages/", addMessage);
module.exports = router;
