import { Request, Response } from "express";

require("dotenv").config();
var morgan = require("morgan");
var colors = require("colors");
var express = require("express");
var userRoutes = require("./routes/user");
var messengerRoutes = require("./routes/messenger");
var companyRoutes = require("./routes/company");
var locationRoutes = require("./routes/location");
var cors = require("cors");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var passport = require("passport");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    // origin: '*',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => res.send("bean-there"));

app.use("/user", userRoutes);
app.use("/messenger", messengerRoutes);
app.use("/company", companyRoutes);
app.use("/location", locationRoutes);

const port = process.env.PORT || 5000;

var db = require("./db/database");
//test
db.authenticate()
  .then(() => {
    console.log(colors.yellow("Connection has been established successfully."));
    app.listen(port, () =>
      console.log(colors.green(`Server connected on port ${port}`))
    );
  })
  .catch((error: Error) => {
    console.log(
      (colors.red as any)("Unable to connect to the database:", error)
    );
  });

module.exports = app;
