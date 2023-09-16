"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var colors = require("colors");
var express = require("express");
var userRoutes = require("./routes/user");
const app = express();
app.get("/", (req, res) => res.send("bean-there"));
app.use("/user", userRoutes);
const port = process.env.PORT || 5001;
var db = require("./db/database");
//test
db.authenticate()
    .then(() => {
    console.log(colors.yellow("Connection has been established successfully."));
    app.listen(port, () => console.log(colors.green(`Server connected on port ${port}`)));
})
    .catch((error) => {
    console.log(colors.red("Unable to connect to the database:", error));
});
