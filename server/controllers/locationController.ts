import { Request, Response } from "express";
import * as dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

var getLocations = async (req: Request, res: Response) => {
  const query = req.params.query;
  console.log(query);

  // optimize -> get someones loc for lat and long params
  axios.get(`${process.env.GOOGLEAPI_URL}
    ?keyword=coffee
    &location=41.881832,-87.623177
    &radius=5000
    &key=${process.env.GOOGLEAPI_KEY}`)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.error('Cannot fetch nearby locations', err)
    })

  // res.status(200).send({ mssg: "reached getLocations controller" });
};

module.exports = { getLocations };
