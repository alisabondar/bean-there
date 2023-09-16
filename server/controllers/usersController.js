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
var User = require("../models/userModel");
var login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // testing login
    const data = { username: "mario", password: "mario123" };
    const { username, password } = data;
    User.findOne({
        where: { username, password },
    })
        .then((user) => {
        // console.log(user.dataValues);
        res
            .status(200)
            .send({ mssg: "user successfully logged in", user: user.dataValues });
    })
        .catch((error) => {
        console.log(error);
        res.status(404).send({ error: "unable to login user" });
    });
});
var register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // testing register
    const data = {
        username: "mario",
        email: "mario@gmail.com",
        password: "mario123",
        photo: "https://picsum.photos/900/400",
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod suscipit dolor. Etiam in risus ante. In convallis sed erat quis elementum. Donec eget augue ac nisl eleifend egestas. Etiam vel nibh felis.",
    };
    const { username, email, password, photo, about } = data;
    User.create({ username, email, password, photo, about })
        .then((user) => {
        // console.log(user);
        res.status(201).send({ mssg: "user successfully registered" });
    })
        .catch((error) => {
        console.log(error);
        res.status(404).send({ error: "unable to register user" });
    });
});
module.exports = { login, register };
