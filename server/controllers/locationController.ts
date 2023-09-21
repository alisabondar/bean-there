import { Request, Response } from "express";
import * as dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

var getCurrent = async (req: Request, res: Response) => {
  const lat = req.params.lat;
  const long = req.params.long;
  const GOOGLE_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const location = `${lat},${long}`;
  const radius = 5000;
  const keyword = 'coffee';
  const type = 'cafe';
  const apiKey = process.env.GOOGLEAPI_KEY;
  const requestUrl = `${GOOGLE_API_ENDPOINT}?location=${location}&radius=${radius}&keyword=${keyword}&type=${type}&key=${apiKey}`;

  axios.get(requestUrl)
   .then(result => {
      console.log(result.data.results)
      res.json(result.data.results);
   })
   .catch(err => {
      console.error('Cannot fetch nearby locations', err);
   });
};

var getLocations = async (req: Request, res: Response) => {
  const zipcode = req.params.zipcode;

  axios.get(`${process.env.GEOCODE_URL}?address=${zipcode}&key=${process.env.GOOGLEAPI_KEY}`)
    .then(result => {
      res.json(result.data.results)
    })
    .catch(err => {
      console.error('Cannot fetch zipcode results', err)
    })
}

module.exports = { getCurrent, getLocations };
