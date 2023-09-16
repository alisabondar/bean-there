import { Request, Response } from "express";

var login = async (req: Request, res: Response) => {
  res.send({ mssg: "this is the login post route" });
};

var register = async (req: Request, res: Response) => {
  res.send({ mssg: "this is the register post route" });
};

module.exports = { login, register };
