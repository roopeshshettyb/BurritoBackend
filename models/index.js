const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.json");
const env = "development";
const dbSettings = dbConfig[env];
const sequelize = new Sequelize(
  dbSettings.database,
  dbSettings.username,
  dbSettings.password,
  dbSettings.dialectInformation
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./category.model")(sequelize, Sequelize);
module.exports = db;
