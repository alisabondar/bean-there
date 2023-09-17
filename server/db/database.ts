require("dotenv").config();
var { Sequelize } = require("sequelize");

const postgres_database = process.env.PG_DB || "postgres";
const postgres_user = process.env.PG_USER || "postgres";

const sequelize = new Sequelize(
  postgres_database,
  postgres_user,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: "postgres",
  }
);

module.exports = sequelize;
