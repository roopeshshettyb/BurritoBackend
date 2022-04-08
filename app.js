const express = require("express");
const app = express();
const serverConfig = require("./config/server.config.js");
const db = require("./models");
const bodyParser = require("body-parser");
const { ROLES } = require("./models");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function init() {
  // db.ROLES.create({
  //   id: 1,
  //   name: db.ROLES[0],
  // });
  // db.ROLES.create({
  //   id: 2,
  //   name: db.ROLES[1],
  // });
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

//set one to many relation ship b/w category and product
db.category.hasMany(db.product);
db.sequelize.sync({ force: true }).then(() => {
  console.log(">> Burrito models/tables are dropped and recreated");
  init();
});
require("./routes/category.routes")(app);
require("./routes/product.routes")(app);
app.listen(serverConfig.PORT, async () => {
  console.log(">> Burrito is working");
  console.log(">> Checking for databases");
});
