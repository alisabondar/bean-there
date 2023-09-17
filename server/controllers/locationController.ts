import { Request, Response } from "express";

var getLocations = async (req: Request, res: Response) => {
  const query = req.params.query;
  console.log(query);

  /**
   * HERE YOU WOULD TAKE THE QUERY AND USE THE GOOGLE API
   * OR YELP API AND SEND BACK THE DATA YOU WANT
   */

  res.status(200).send({ mssg: "reached getLocations controller" });
};

module.exports = { getLocations };
