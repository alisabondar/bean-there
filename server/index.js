"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var morgan = require("morgan");
var colors = require("colors");
var express = require("express");
var cors = require('cors');
var userRoutes = require("./routes/user");
var messengerRoutes = require("./routes/messenger");
var companyRoutes = require("./routes/company");
var locationRoutes = require("./routes/location");
var cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.get("/", (req, res) => res.send("bean-there"));
app.use("/user", userRoutes);
app.use("/messenger", messengerRoutes);
app.use("/company", companyRoutes);
app.use("/location", locationRoutes);
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
module.exports = app;
