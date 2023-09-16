import { Request, Response } from "express";

require("dotenv").config();
var colors = require("colors");
var express = require("express");
var userRoutes = require("./routes/user");

const app = express();

app.get("/", (req: Request, res: Response) => res.send("bean-there"));

app.use("/user", userRoutes);

const port = process.env.PORT || 5001;

var db = require("./db/database");
//test
db.authenticate()
  .then(() => {
    console.log(
      (colors.yellow as any)("Connection has been established successfully.")
    );
    app.listen(port, () =>
      console.log((colors.green as any)(`Server connected on port ${port}`))
    );
  })
  .catch((error: Error) => {
    console.log(
      (colors.red as any)("Unable to connect to the database:", error)
    );
  });
