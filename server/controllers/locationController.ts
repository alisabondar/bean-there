import { Request, Response } from "express";
import * as dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

var getCurrent = async (req: Request, res: Response) => {
  const lat = req.params.lat;
  const long = req.params.long;

  axios.get(`${process.env.GOOGLEAPI_URL}?keyword=coffee&location=${lat},${long}&radius=5000&key=${process.env.GOOGLEAPI_KEY}`)
    .then(result => {
      console.log(result.data.results);
      res.json(result.data.results)
    })
    .catch(err => {
      console.error('Cannot fetch nearby locations', err)
    })
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

// var getMap = async (req: Request, res: Response) => {

//   axios.get(`${process.env.GOOGLEAPI_URL}?keyword=coffee&location=${lat},${long}&radius=5000&key=${process.env.GOOGLEAPI_KEY}`)
//     .then(result => {
//       res.json(result.data.results)
//     })
//     .catch(err => {
//       console.error('Cannot fetch nearby locations', err)
//     })
// }

module.exports = { getCurrent, getLocations };
