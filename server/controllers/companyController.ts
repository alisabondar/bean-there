import { Request, Response } from "express";

const { Review, ReviewPhoto } = require("../models/reviewModel");

var getReviews = async (req: Request, res: Response) => {
  const placeId = req.params.placeId;
  console.log(placeId);

  Review.findAll({
    where: { location_id: placeId },
    include: [{ model: ReviewPhoto, as: "reviews_photos" }],
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

  const { title, body, rating, location_id } = req.body;

  //light validation
  if (!placeId) {
    return res.status(404).send({
      error: "please let us know what company you are making a review for",
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

  if (!rating) {
    return res.status(404).send({ error: "please add " });
  }

  if (!location_id) {
    // user did not enter a location id
    return res.status(404).send({ error: "please enter a location" });
  }

  res.status(200).send({ mssg: "reached getReviews controller" });
};

module.exports = { getReviews, addReview };
