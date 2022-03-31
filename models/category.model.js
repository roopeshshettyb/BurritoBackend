const Sequelize = require(".");

module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
    },
    {
      tablename: "categories",
    }
  );
  return Category;
};
