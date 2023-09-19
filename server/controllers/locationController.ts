import { Request, Response } from "express";
import * as dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

var getLocations = async (req: Request, res: Response) => {
  const lat = req.params.lat;
  const long = req.params.long;
  // params for zipcode -> lat and long coords
  console.log('server', lat, long);

  axios.get(`${process.env.GOOGLEAPI_URL}?keyword=coffee&location=${req.params.lat},${req.params.long}&radius=5000&key=${process.env.GOOGLEAPI_KEY}`)
    .then(result => {
      console.log(result.data)
    })
    .catch(err => {
      console.error('Cannot fetch nearby locations', err)
    })

  // res.status(200).send({ mssg: "reached getLocations controller" });
};

module.exports = { getLocations };
