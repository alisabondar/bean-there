"use strict";
var express = require("express");
var router = express.Router();
var { getCurrent, getLocations } = require("../controllers/locationController");
// all these endpoints start with /location*
router.get("/search/:lat/:long", getCurrent);
router.get("/search/:lat/:long/:filter", getCurrent);
router.get("/search/:zipcode", getLocations);
module.exports = router;
