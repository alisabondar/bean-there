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
  const apiKey = process.env.GOOGLEAPI_KEY;
  const requestUrl = `${GOOGLE_API_ENDPOINT}?location=${location}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;
  axios.get(requestUrl)
   .then(result => {
      res.json(result.data.results);
   })
   .catch(err => {
      console.error('Cannot fetch nearby locations', err);
   });
};

// var getCurrent = async (req: Request, res: Response) => {
//   const lat = req.params.lat;
//   const long = req.params.long;

//   console.log('req url', `${process.env.GOOGLEAPI_URL}?keyword=coffee&location=${lat},${long}&radius=5000&key=${process.env.GOOGLEAPI_KEY}`)

//   axios.get(`${process.env.GOOGLEAPI_URL}?keyword=coffee&location=${lat},${long}&radius=5000&key=${process.env.GOOGLEAPI_KEY}`)
//     .then(result => {
//       res.json(result.data.results)
//     })
//     .catch(err => {
//       console.error('Cannot fetch nearby locations', err)
//     })
// };

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
