"use strict";
var express = require("express");
var router = express.Router();
var { login, register, getWishlist, getUserReviews, } = require("../controllers/usersController");
// all these endpoints start with /user*
router.post("/login", login);
router.post("/register", register);
router.get("/:userId/wishlist", getWishlist);
router.get("/:userId/reviews", getUserReviews);
/**
 * FUTURE
 *
 * router.put("/:userId/wishlist")
 *
 * first check if the place_id exists in the locations table
 *
 * if (YES) => grab its id
 * if (NO) => add it and grab its id
 *
 * then take that id ^ and check if the user has an entry
 * for that location id in location_wishlists
 *
 * if (YES) => update the visited status
 * if (NO) => add an entry
 *
 */
module.exports = router;
