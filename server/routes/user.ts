var express = require("express");
var router = express.Router();
var { login, register } = require("../controllers/usersController");

// all these endpoints start with /user*

router.post("/login", login);
router.post("/register", register);

module.exports = router;
