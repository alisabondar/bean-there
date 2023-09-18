var express = require("express");
var router = express.Router();
var { getLocations } = require("../controllers/locationController");

// all these endpoints start with /company*

router.get("/search/:query", getLocations);

module.exports = router;
