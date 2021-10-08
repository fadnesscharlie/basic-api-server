"use strict";

require("dotenv").config();

// connect to our databse depending POSTGRES-URI OR DATABASE_URL

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite: memory" : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

// Define our schemas/models
const food = require("./food.js");
const clothes = require("./clothes.js");

module.exports = {
  db: sequelize,
  Clothes: clothes(sequelize, DataTypes),
  Food: food(sequelize, DataTypes),
};
