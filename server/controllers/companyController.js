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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const { Review, ReviewPhoto } = require("../models/reviewModel");
const { LocationModel } = require("../models/locationModel");
var { User } = require("../models/userModel");
var db = require("../db/database");
var getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = req.params.placeId;
    console.log(placeId);
    Review.findAll({
        where: { location_id: placeId },
        include: [
            { model: ReviewPhoto, as: "reviews_photos" },
            { model: User, as: "users", attributes: ["username"] },
        ],
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
    yield LocationModel.findByPk(placeId, { raw: true })
        .then((results) => {
        if (results === null) {
            // if the location does not exist we will have to add it
            return LocationModel.create({
                place_id: placeId,
                name: location_name,
            }).then((loc) => {
                return loc.dataValues;
            });
        }
        return results;
    })
        .then((location) => {
        // here location = { place_id, name }
        // so now location is stored, make a review
        const location_id = location.place_id;
        Review.create({ title, body, rating, location_id, user_id }).then((results) => {
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
        });
    })
        .catch((err) => {
        const error = err.message || "internal server error";
        res.status(404).send({ error });
    });
});
const getPlaceDetails = (req, res) => {
    const { placeId } = req.params;
    console.log(placeId);
    const url = `https://maps.googleapis.com/maps/api/place/details/json?&place_id=${placeId}&key=${process.env.GOOGLEAPI_KEY}`;
    axios_1.default.get(url)
        .then(response => {
        if (response.data.status === 'OK') {
            res.status(200).json(response.data);
        }
        else {
            res.status(400).json({ status: 'Error', message: response.data.status });
        }
    })
        .catch(error => {
        console.error('Error fetching place details:', error);
        res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    });
};
module.exports = { getReviews, addReview, getPlaceDetails };
