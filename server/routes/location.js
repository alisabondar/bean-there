"use strict";
var express = require("express");
var router = express.Router();
var { getLocations } = require("../controllers/locationController");
// all these endpoints start with /company*
router.get("/search/:lat/:long", getLocations);
module.exports = router;
