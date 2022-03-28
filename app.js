const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const dbConfig = require("./config/db.config.json");
const env = "development";
const dbSettings = dbConfig[env];
const sequelize = new Sequelize(
  dbSettings.database,
  dbSettings.username,
  dbSettings.password,
  dbSettings.dialectInformation
);

app.get("/", (req, res) => res.send("Welcome to ecommerce app"));

app.listen(3000, async () => {
  console.log("Burrito is working");
  console.log("Checking for databases");
  try {
    await sequelize.authenticate();
    console.log("Connected to db");
  } catch (err) {
    console.log("Unable to connect to db", err);
  }
});
