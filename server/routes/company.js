"use strict";
var express = require("express");
var router = express.Router();
var { getReviews, addReview, getPlaceDetails } = require("../controllers/companyController");
// all these endpoints start with /company*
router.get("/:placeId/reviews", getReviews);
router.post("/:placeId/reviews/add", addReview);
router.get("/:placeId/details", getPlaceDetails);
module.exports = router;
