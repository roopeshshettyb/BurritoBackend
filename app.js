const express = require("express");
const app = express();
const serverConfig = require("./config/server.config.js");
const { sequelize, Sequelize } = require("./models");
const db = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function init() {
  var categoriesData = [
    { name: "Electronics", description: "This contains electrical appliances" },
    { name: "Vegetables", description: "This contains vegetables" },
  ];

  db.category
    .bulkCreate(categoriesData)
    .then(() => {
      console.log(">> Category table is initialized with category data");
    })
    .catch((err) => {
      console.log(">> Bulkcreate error", err);
    });
}
db.sequelize.sync({ force: true }).then(() => {
  console.log(">> Burrito models/tables are dropped and recreated");
});
require("./routes/category.routes")(app);
require("./routes/product.routes")(app);
app.listen(serverConfig.PORT, async () => {
  console.log(">> Burrito is working");
  console.log(">> Checking for databases");
});
