"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport');
var initializePassport = require('../passport-config.js');
var db = require("../db/database");
var { User, Friend } = require("../models/userModel");
var bcrypt = require("bcrypt");
initializePassport(passport);
var login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            throw err;
        }
        ;
        if (!user) {
            // failure
            res.send({ success: false, message: 'Invalid login credentials' });
        }
        else {
            // authentication success case
            req.login(user, (err) => {
                if (err) {
                    throw err;
                }
                res.send({ success: true });
            });
        }
    })(req, res, next);
});
var getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('this is the req.user!!!:', req.user);
    if (!req.user) {
        return res.send({ error: "user is not logged in" });
    }
    ;
    try {
        const user = yield User.findOne({ where: { id: req.user }, attributes: ["id", "username", "email", "photo", "banner_photo", "about", "private"], raw: true });
        res.send(user);
    }
    catch (error) {
        res.status(400).send({ error: "internal server error" });
    }
});
var register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, photo, banner_photo, about } = req.body;
    const user = yield User.findOne({ where: { email: email } });
    if (user) {
        return res.send({ message: "There is already an account linked to this email." });
    }
    if (!username) {
        return res.status(400).send({ message: "Please enter a username" });
    }
    if (!email) {
        return res.status(400).send({ message: "Please enter a email" });
    }
    if (!password) {
        return res.status(400).send({ message: "Please enter a password" });
    }
    const hashedPassword = yield bcrypt.hash(password, 10);
    User.create({ username, email, password: hashedPassword, photo, about })
        .then((user) => {
        res
            .status(201)
            .send({ mssg: "user successfully registered", user: user.dataValues, success: true });
    })
        .catch((err) => {
        const error = err.message || "internal server error";
        res.status(400).send({ error });
    });
});
var getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.userId);
    const user_id = req.params.userId;
    yield db
        .query(`
  SELECT w.*, l.name as location_name
  FROM favorites w
  INNER JOIN locations l ON w.location_id = l.place_id
  WHERE w.user_id = ${user_id};
`, { type: db.QueryTypes.SELECT })
        .then((wishlist) => {
        res.status(200).send({
            mssg: "favorites successfully fetched",
            wishlist,
        });
    })
        .catch((err) => {
        const error = err.message || "internal server error";
        res.status(404).send({ error });
    });
});
var getUserReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.userId;
    // Review.findAll({ where: { user_id } })
    yield db
        .query(`
SELECT r.*, l.name as location_name
FROM reviews r
INNER JOIN locations l ON r.location_id = l.place_id
WHERE r.user_id = ${user_id};
`, { type: db.QueryTypes.SELECT })
        .then((reviews) => {
        res.status(200).send({
            mssg: "reviews successfully fetched",
            reviews,
        });
    })
        .catch((err) => {
        const error = err.message || "internal server error";
        res.status(404).send({ error });
    });
});
var getFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    // light validation
    if (!userId) {
        return res.status(404).send({ error: "unknown user, please try again" });
    }
    Friend.findAll({
        where: { user_id: userId },
        include: [
            {
                model: User,
                as: "users",
                attributes: ["username"],
            },
        ],
        raw: true,
    }).then((friends) => {
        res.status(200).send({
            mssg: "friends successfully fetched",
            friends,
        });
    });
});
// PATCH REQ
var updateWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, location_id, name } = req.body;
    if (!user_id || !location_id) {
        return res.status(400).send({ error: "Missing user_id or location_id" });
    }
    try {
        const [existingLocation] = yield db.query(`SELECT * FROM locations WHERE place_id = ?`, {
            replacements: [location_id],
            type: db.QueryTypes.SELECT,
        });
        if (!existingLocation) {
            yield db.query(`INSERT INTO locations (place_id, name) VALUES (?, ?)`, {
                replacements: [location_id, name],
                type: db.QueryTypes.INSERT,
            });
        }
        const [existingRows] = yield db.query(`SELECT * FROM favorites WHERE user_id = ? AND location_id = ?`, {
            replacements: [user_id, location_id],
            type: db.QueryTypes.SELECT,
        });
        if (existingRows) {
            yield db.query(`DELETE FROM favorites WHERE user_id = ? AND location_id = ?`, {
                replacements: [user_id, location_id],
                type: db.QueryTypes.DELETE,
            });
        }
        else {
            yield db.query(`INSERT INTO favorites (user_id, location_id) VALUES (?, ?)`, {
                replacements: [user_id, location_id],
                type: db.QueryTypes.INSERT,
            });
        }
        res.status(200).send({ message: "Wishlist updated successfully." });
    }
    catch (err) {
        console.error("Error:", err);
        const error = err.message || "Internal server error";
        res.status(500).send({ error });
    }
});
module.exports = { login, register, getWishlist, getUserReviews, getFriends, updateWishlist, getProfile };
