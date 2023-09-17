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
const { Review, ReviewPhoto } = require("../models/reviewModel");
var getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = req.params.placeId;
    console.log(placeId);
    Review.findAll({
        where: { location_id: placeId },
        include: [{ model: ReviewPhoto, as: "reviews_photos" }],
    })
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
var addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
module.exports = { getReviews, addReview };
