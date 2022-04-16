const app = require("../app");
const { requestValidator, auth } = require("../middlewares");

const productController = require("../controllers/product.controller");

module.exports = function (app) {
  app.post(
    "/ecomm/api/v1/products/create",
    auth.verifyToken,
    auth.isAdmin,
    requestValidator.validateProductRequest,
    productController.create
  );
  app.put(
    "/ecomm/api/v1/products/update/:id",
    auth.verifyToken,
    auth.isAdmin,
    requestValidator.validateProductRequest,
    productController.update
  );
  app.delete(
    "/ecomm/api/v1/products/:id",
    auth.verifyToken,
    auth.isAdmin,
    productController.deleteProduct
  );
  app.get("/ecomm/api/v1/products/:id", productController.findOne);
  app.get("/ecomm/api/v1/products", productController.findAll);
  app.get(
    "/ecomm/api/v1/categories/:categoryId/products",
    requestValidator.validateCategoryInRequestParams,
    productController.getProductsUnderCategory
  );
};
