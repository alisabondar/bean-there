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
var db = require("../db/database");
var { User, Friend } = require("../models/userModel");
var login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * SO INSTEAD OF WHAT I HAVE HERE CURRENTLY
     * YOU WOULD GET THE DATA FROM THE REQUEST
     * I ASSUME THROUGH REQ.BODY
     *
     * THEN YOU WILL HASH THE PASSWORD
     * FIND THE USER
     *
     * AND ADD AUTHENTICATION CREDENTIALS
     * AND SEND THAT BACK
     */
    // testing login
    const { username, password } = req.body;
    if (!username) {
        return res.status(404).send({ error: "please enter a username" });
    }
    if (!password) {
        return res.status(404).send({ error: "please enter a password" });
    }
    User.findOne({
        where: { username, password },
    })
        .then((user) => {
        if (!user) {
            throw Error("unable to login user");
        }
        res
            .status(200)
            .send({ mssg: "user successfully logged in", user: user.dataValues });
    })
        .catch((err) => {
        const error = err.message || "internal server error";
        res.status(404).send({ error });
    });
});
var register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * SO INSTEAD OF WHAT I HAVE HERE CURRENTLY
     * YOU WOULD GET THE DATA FROM THE REQUEST
     * I ASSUME THROUGH REQ.BODY
     *
     * THEN YOU WILL HASH THE PASSWORD
     * CREATE THE USER
     */
    // testing register
    // const data = {
    //   username: "mario",
    //   email: "mario@gmail.com",
    //   password: "mario123",
    //   photo: "https://picsum.photos/900/400",
    //   about:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod suscipit dolor. Etiam in risus ante. In convallis sed erat quis elementum. Donec eget augue ac nisl eleifend egestas. Etiam vel nibh felis.",
    // };
    const { username, email, password, photo, banner_photo, about } = req.body;
    if (!username) {
        return res.status(404).send({ error: "please enter a username" });
    }
    if (!email) {
        return res.status(404).send({ error: "please enter a email" });
    }
    if (!password) {
        return res.status(404).send({ error: "please enter a password" });
    }
    User.create({ username, email, password, photo, about })
        .then((user) => {
        res
            .status(201)
            .send({ mssg: "user successfully registered", user: user.dataValues });
    })
        .catch((err) => {
        const error = err.message || "internal server error";
        res.status(404).send({ error });
    });
});
var getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.userId;
    yield db
        .query(`
  SELECT w.*, l.name as location_name
  FROM wishlists w
  INNER JOIN locations l ON w.location_id = l.place_id
  WHERE w.user_id = ${user_id};
`, { type: db.QueryTypes.SELECT })
        .then((wishlist) => {
        res.status(200).send({
            mssg: "wishlist successfully fetched",
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
module.exports = { login, register, getWishlist, getUserReviews, getFriends };
