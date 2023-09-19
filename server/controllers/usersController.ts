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

  const user = await User.findOne({ where: { email: email }});

  if (user) {
    return res.send({ message: "There is already an account linked to this email."})
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

  const hashedPassword = await bcrypt.hash(password, 10);

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
  console.log(req.params.userId);
  const user_id = req.params.userId;

  await db
    .query(
      `
  SELECT w.*, l.name as location_name
  FROM favorites w
  INNER JOIN locations l ON w.location_id = l.place_id
  WHERE w.user_id = ${user_id};
`,
      { type: db.QueryTypes.SELECT }
    )
    .then((wishlist: []) => {
      res.status(200).send({
        mssg: "favorites successfully fetched",
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

// PATCH REQ

var updateWishlist = async (req: Request, res: Response) => {
  const { user_id, location_id, name } = req.body;

  if (!user_id || !location_id) {
      return res.status(400).send({ error: "Missing user_id or location_id" });
  }

  try {
      const [existingLocation] = await db.query(
          `SELECT * FROM locations WHERE place_id = ?`, {
          replacements: [location_id],
          type: db.QueryTypes.SELECT,
      });
      if (!existingLocation) {
          await db.query(`INSERT INTO locations (place_id, name) VALUES (?, ?)`, {
              replacements: [location_id, name],
              type: db.QueryTypes.INSERT,
          });
      }
      const [existingRows] = await db.query(
          `SELECT * FROM favorites WHERE user_id = ? AND location_id = ?`, {
          replacements: [user_id, location_id],
          type: db.QueryTypes.SELECT,
      });
      if (existingRows) {
          await db.query(
              `DELETE FROM favorites WHERE user_id = ? AND location_id = ?`, {
              replacements: [user_id, location_id],
              type: db.QueryTypes.DELETE,
          });
      }
      else {
          await db.query(
              `INSERT INTO favorites (user_id, location_id) VALUES (?, ?)`, {
              replacements: [user_id, location_id],
              type: db.QueryTypes.INSERT,
          });
      }
      res.status(200).send({ message: "Wishlist updated successfully." });
  } catch (err: any) {
    console.error("Error:", err);
    const error = err.message || "Internal server error";
    res.status(500).send({ error });
  }
};





module.exports = { login, register, getWishlist, getUserReviews, getFriends, updateWishlist, getProfile };
