module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define(
    "carts",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cost: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      tablename: "carts",
    }
  );
  return Cart;
};
