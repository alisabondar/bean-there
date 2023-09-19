import { Request, Response, NextFunction } from "express";
var passport = require('passport');
var initializePassport = require('../passport-config.js');
var db = require("../db/database");
var { User, Friend } = require("../models/userModel");
var bcrypt = require("bcrypt");

initializePassport(passport);

var login = async (req: any, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      throw err
    };
    if (!user) {
      // failure
      res.send({ success: false, message: 'Invalid login credentials' });
    } else {
      // authentication success case
      req.login(user, (err: any) => {
        if (err) {
          throw err
        }
        res.send({ success: true });
      })
    }
  })(req, res, next)
};

var getProfile = async (req: any, res: Response) => {
  console.log('this is the req.user!!!:', req.user);
  if (!req.user) { return res.send({ error: "user is not logged in"})};

  try {
    const user = await User.findOne({ where: { id: req.user }, attributes: ["id", "username", "email", "photo", "banner_photo", "about", "private"], raw: true});
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: "internal server error"});
  }

};

var register = async (req: Request, res: Response) => {
  const { username, email, password, photo, banner_photo, about } = req.body;

  if (!username) {
    return res.status(400).send({ error: "please enter a username" });
  }

  if (!email) {
    return res.status(400).send({ error: "please enter a email" });
  }

  if (!password) {
    return res.status(400).send({ error: "please enter a password" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  User.create({ username, email, password: hashedPassword, photo, about })
    .then((user: { dataValues: object }) => {
      res
        .status(201)
        .send({ mssg: "user successfully registered", user: user.dataValues, success: true });
    })
    .catch((err: Error) => {
      const error = err.message || "internal server error";
      res.status(400).send({ error });
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
    })
    .catch((err: Error) => {
      const error = err.message || "internal server error";
      res.status(404).send({ error });
    });
};

var getFriends = async (req: Request, res: Response) => {
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
  }).then((friends: []) => {
    res.status(200).send({
      mssg: "friends successfully fetched",
      friends,
    });
  });
};

module.exports = { login, register, getWishlist, getUserReviews, getFriends, getProfile };
