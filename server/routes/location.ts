var express = require("express");
var router = express.Router();
var { getCurrent, getLocations, getMap } = require("../controllers/locationController");

// all these endpoints start with /location*

router.get("/search/:lat/:long", getCurrent);
router.get("/search/:zipcode", getLocations);
router.get("/search/map", getMap);

module.exports = router;
