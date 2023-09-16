var express = require("express");
var router = express.Router();
var { login, register } = require("../controllers/usersController");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
