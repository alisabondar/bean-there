import { Request, Response } from "express";

require("dotenv").config();
var morgan = require("morgan");
var colors = require("colors");
var express = require("express");
var userRoutes = require("./routes/user");
var messengerRoutes = require("./routes/messenger");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => res.send("bean-there"));

app.use("/user", userRoutes);
app.use("/messenger/rooms", messengerRoutes);

/**
 * GET /reviews/
 * GIVEN A LOCATION PLACE ID | FROM GOOGLE API |
 * GET ALL REVIEWS THAT MATCH THAT PLACE ID
 * FROM [reviews]
 *
 * POST reviews/
 * GIVEN A LOCATION PLACE ID | FROM GOOGLE API |
 * get { title, body, date, rating, }
 */

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
