import { Request, Response } from "express";

var User = require("../models/userModel");

var login = async (req: Request, res: Response) => {
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
  const data = { username: "mario", password: "mario123" };

  const { username, password } = data;

  User.findOne({
    where: { username, password },
  })
    .then((user: { dataValues: object }) => {
      // console.log(user.dataValues);
      res
        .status(200)
        .send({ mssg: "user successfully logged in", user: user.dataValues });
    })
    .catch((error: Error) => {
      console.log(error);
      res.status(404).send({ error: "unable to login user" });
    });
};

var register = async (req: Request, res: Response) => {
  /**
   * SO INSTEAD OF WHAT I HAVE HERE CURRENTLY
   * YOU WOULD GET THE DATA FROM THE REQUEST
   * I ASSUME THROUGH REQ.BODY
   *
   * THEN YOU WILL HASH THE PASSWORD
   * CREATE THE USER
   */

  // testing register
  const data = {
    username: "mario",
    email: "mario@gmail.com",
    password: "mario123",
    photo: "https://picsum.photos/900/400",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod suscipit dolor. Etiam in risus ante. In convallis sed erat quis elementum. Donec eget augue ac nisl eleifend egestas. Etiam vel nibh felis.",
  };

  const { username, email, password, photo, about } = data;

  User.create({ username, email, password, photo, about })
    .then((user: []) => {
      // console.log(user);
      res.status(201).send({ mssg: "user successfully registered" });
    })
    .catch((error: Error) => {
      console.log(error);
      res.status(404).send({ error: "unable to register user" });
    });
};

module.exports = { login, register };
