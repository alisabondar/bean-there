import { Request, Response } from "express";

var db = require("../db/database");

var { User } = require("../models/userModel");

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
    .then((user: { dataValues: object }) => {
      if (!user) {
        throw Error("unable to login user");
      }
      res
        .status(200)
        .send({ mssg: "user successfully logged in", user: user.dataValues });
    })
    .catch((err: Error) => {
      const error = err.message || "internal server error";
      res.status(404).send({ error });
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
    .then((user: { dataValues: object }) => {
      res
        .status(201)
        .send({ mssg: "user successfully registered", user: user.dataValues });
    })
    .catch((err: Error) => {
      const error = err.message || "internal server error";
      res.status(404).send({ error });
    });
};

var getWishlist = async (req: Request, res: Response) => {
  const user_id = req.params.userId;

  await db
    .query(
      `
  SELECT w.*, l.name as location_name
  FROM wishlists w
  INNER JOIN locations l ON w.location_id = l.place_id
  WHERE w.user_id = ${user_id};
`,
      { type: db.QueryTypes.SELECT }
    )
    .then((wishlist: []) => {
      res.status(200).send({
        mssg: "wishlist successfully fetched",
        wishlist,
      });
    })
    .catch((err: Error) => {
      const error = err.message || "internal server error";
      res.status(404).send({ error });
    });
};

var getUserReviews = async (req: Request, res: Response) => {
  const user_id = req.params.userId;

  // Review.findAll({ where: { user_id } })
  await db
    .query(
      `
SELECT r.*, l.name as location_name
FROM reviews r
INNER JOIN locations l ON r.location_id = l.place_id
WHERE r.user_id = ${user_id};
`,
      { type: db.QueryTypes.SELECT }
    )
    .then((reviews: []) => {
      res.status(200).send({
        mssg: "reviews successfully fetched",
        reviews,
      });
    });
};

module.exports = { login, register, getWishlist, getUserReviews };
