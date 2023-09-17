"use strict";
var express = require("express");
var router = express.Router();
var { getReviews, addReview } = require("../controllers/companyController");
// all these endpoints start with /company*
router.get("/:placeId/reviews", getReviews);
router.post("/:placeId/review", addReview);
module.exports = router;
