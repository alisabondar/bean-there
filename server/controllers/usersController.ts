import { Request, Response } from "express";

var db = require("../db/database");

var { User, Friend } = require("../models/userModel");

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
  console.log(req.params.userId);
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

// PATCH REQ

var updateWishlist = async (req: Request, res: Response) => {
  const { user_id, visited, wishlisted, location_id, name } = req.body;
  console.log('location_id:', location_id);
  console.log('place_name:', name);


  if (location_id === undefined || (visited === undefined && wishlisted === undefined)) {
    return res.status(400).send({ error: "Missing parameters" });
  }

  try {
    const [existingLocation] = await db.query(
      `SELECT * FROM locations WHERE place_id = ?`,
      {
        replacements: [location_id],
        type: db.QueryTypes.SELECT,
      }
    );

    if (!existingLocation) {
      await db.query(
        `INSERT INTO locations (place_id, name) VALUES (?, ?)`,
        {
          replacements: [location_id, name],
          type: db.QueryTypes.INSERT,
        }
      );
    }

    const [existingRows] = await db.query(
      `SELECT * FROM wishlists WHERE user_id = ? AND location_id = ?`,
      {
        replacements: [user_id, location_id],
        type: db.QueryTypes.SELECT,
      }
    );

    if (existingRows) {
      let updateQuery = `UPDATE wishlists SET `;
      const updates = [];
      const replacements = [];

      if (visited !== undefined) {
        updates.push('visited = ?');
        replacements.push(visited);
      }

      if (wishlisted !== undefined) {
        updates.push('wishlisted = ?');
        replacements.push(wishlisted);
        }

      updateQuery += updates.join(', ') + ` WHERE user_id = ? AND location_id = ?`;
      replacements.push(user_id, location_id);
      await db.query(updateQuery, {
        replacements,
        type: db.QueryTypes.UPDATE,
      });

    } else {
      const visitedDefault = visited !== undefined ? visited : false;
      const wishlistedDefault = wishlisted !== undefined ? wishlisted : false;

      await db.query(
        `INSERT INTO wishlists (user_id, location_id, visited, wishlisted) VALUES (?, ?, ?, ?)`,
        {
          replacements: [user_id, location_id, visitedDefault, wishlistedDefault],
          type: db.QueryTypes.INSERT,
        }
      );
    }

    res.status(200).send({ message: "Wishlist status updated" });
  } catch (err: any) {
    console.error("Error:", err);
    const error = err.message || "Internal server error";
    res.status(500).send({ error });
  }
};





module.exports = { login, register, getWishlist, getUserReviews, getFriends, updateWishlist };
