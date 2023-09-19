var express = require("express");
var router = express.Router();
var {
  login,
  register,
  getWishlist,
  getUserReviews,
  getFriends,
  updateWishlist
  getProfile
} = require("../controllers/usersController");

// all these endpoints start with /user*

router.post("/login", login);
router.post("/register", register);

router.get("/profile", getProfile);

router.get("/:userId/wishlist", getWishlist);
router.get("/:userId/reviews", getUserReviews);
router.get("/:userId/friends", getFriends);

router.patch("/:userId/wishlist", updateWishlist);

/**
 * FUTURE - 1
 *d
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

/**
 * FUTURE - 2
 *
 * router.post("/:userId/friend/add")
 *
 * different ways to handle this, here is what comes to mind first
 *
 * make it a one sided friend ship
 * => in other words if one person friends someone, both people
 * are automatically friends with themselves
 *
 * so we make TWO entries in the friends table every time
 *  friend_id: friendId, user_id: userId
 * THEN
 *  friend_id: userId, user_id: userId
 *
 * if you are able to just grab friendId and send it in REQ.BODY
 * if you cannot get the friendId, get the friend username
 * and look it up with the findOne sequelize function
 * since usernames are unqiue this should be a safe approach
 * just an extra step if you cannot get the friendId directly
 *
 */

module.exports = router;
