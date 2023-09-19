import { Request, Response } from "express";

const { Review, ReviewPhoto } = require("../models/reviewModel");
const { LocationModel } = require("../models/locationModel");
var { User } = require("../models/userModel");
var db = require("../db/database");

var getReviews = async (req: Request, res: Response) => {
  const placeId = req.params.placeId;
  console.log(placeId);

  Review.findAll({
    where: { location_id: placeId },
    include: [
      { model: ReviewPhoto, as: "reviews_photos" },
      { model: User, as: "users", attributes: ["username"] },
    ],
  })
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

var addReview = async (req: Request, res: Response) => {
  const placeId = req.params.placeId;

  const { title, body, rating, location_name, user_id, photos } = req.body;

  //light validation
  if (!placeId || !location_name) {
    return res.status(404).send({
      error: "please let us know what company you are making a review for",
    });
  }

  if (!user_id) {
    return res.status(404).send({
      error: "unable to get user credentials, please try again",
    });
  }

  if (!title) {
    return res
      .status(404)
      .send({ error: "please enter a title for your review" });
  }

  if (!body) {
    return res.status(404).send({ error: "please enter a review message" });
  }

  if (!rating || !(rating >= 1 && rating <= 5)) {
    return res.status(404).send({ error: "please add a valid rating" });
  }

  // check if location exists
  await LocationModel.findByPk(placeId, { raw: true })
    .then((results: { place_id: number; name: string }) => {
      if (results === null) {
        // if the location does not exist we will have to add it
        return LocationModel.create({
          place_id: placeId,
          name: location_name,
        }).then((loc: { dataValues: object }) => {
          return loc.dataValues;
        });
      }
      return results;
    })
    .then((location: any) => {
      // here location = { place_id, name }
      // so now location is stored, make a review
      const location_id = location.place_id;

      Review.create({ title, body, rating, location_id, user_id }).then(
        (results: { dataValues: object }) => {
          const review = results.dataValues;
          /**
           *  HERE YOU WOULD ADD THE LOGIC TO CHECK IF THE USER HAS PHOTOS
           *  AND THEN TAKE THOSE PHOTOS AND ADD THEM TO THE PHOTOS TABLE
           *  I WILL MAKE THIS A STRETCH GOAL review.id SHOULD GIVE YOU
           *  THE id TO USE FOR THE review_id COLUMN IN THE reviews_photo table
           */

          res
            .status(201)
            .send({ mssg: "reached getReviews controller", review });
        }
      );
    })
    .catch((err: Error) => {
      const error = err.message || "internal server error";
      res.status(404).send({ error });
    });
};

module.exports = { getReviews, addReview };
