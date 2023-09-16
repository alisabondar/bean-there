"use strict";
var express = require("express");
var router = express.Router();
var { getRooms, getMessages, addRoom, addMessage, } = require("../controllers/messengerController");
// all these endpoints start with /messenger*
router.get("/rooms/user/:userId", getRooms);
router.get("/rooms/:roomId/messages/", getMessages);
router.post("/rooms/add", addRoom);
router.post("/rooms/:roomId/messages/", addMessage);
module.exports = router;
