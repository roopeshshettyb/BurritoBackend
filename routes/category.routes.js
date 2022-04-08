const app = require("../app");
const { requestValidator, auth } = require("../middlewares");
const categoryController = require("../controllers/category.controller");

module.exports = function (app) {
  app.post(
    "/ecomm/api/v1/categories/create",
    requestValidator.validateCategoryRequest,
    auth.isAdmin,
    categoryController.create
  );
  app.put(
    "/ecomm/api/v1/categories/update/:id",
    requestValidator.validateCategoryRequest,
    auth.isAdmin,
    categoryController.update
  );
  app.delete(
    "/ecomm/api/v1/categories/:id",
    auth.isAdmin,
    categoryController.deleteCategory
  );
  app.get(
    "/ecomm/api/v1/categories/:id",
    requestValidator.validateCategoryRequest,
    categoryController.findOne
  );
  app.get("/ecomm/api/v1/categories", categoryController.findAll);
};
