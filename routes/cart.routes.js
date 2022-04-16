const app = require("../app");
const { requestValidator, auth } = require("../middlewares");

const cartController = require("../controllers/cart.controller");

module.exports = function (app) {
  app.post(
    "/ecomm/api/v1/carts/create",
    auth.verifyToken,
    cartController.create
  );
  app.put(
    "/ecomm/api/v1/carts/update/:id",
    auth.verifyToken,
    cartController.update
  );
  app.delete(
    "/ecomm/api/v1/carts/:id",
    auth.verifyToken,
    cartController.deleteCart
  );
  app.get("/ecomm/api/v1/carts/:id", cartController.getCart);
  app.get("/ecomm/api/v1/carts", cartController.findAll);
  app.get(
    "/ecomm/api/v1/categories/:categoryId/carts",
    cartController.getCartsUnderCategory
  );
};
