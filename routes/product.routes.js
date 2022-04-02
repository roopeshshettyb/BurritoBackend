const app = require("../app");

const productController = require("../controllers/product.controller");

module.exports = function (app) {
  app.post("/ecomm/api/v1/products/create", productController.create);
  app.put("/ecomm/api/v1/products/update/:id", productController.update);
  app.delete("/ecomm/api/v1/products/:id", productController.deleteProduct);
  app.get("/ecomm/api/v1/products/:id", productController.findOne);
  app.get("/ecomm/api/v1/products", productController.findAll);
};
