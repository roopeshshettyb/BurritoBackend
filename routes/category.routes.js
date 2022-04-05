const app = require("../app");
const { requestValidator } = require("../middlewares");
const categoryController = require("../controllers/category.controller");

module.exports = function (app) {
  app.post(
    "/ecomm/api/v1/categories/create",
    requestValidator.validateCategoryRequest,
    categoryController.create
  );
  app.put(
    "/ecomm/api/v1/categories/update/:id",
    requestValidator.validateCategoryRequest,
    categoryController.update
  );
  app.delete("/ecomm/api/v1/categories/:id", categoryController.deleteCategory);
  app.get("/ecomm/api/v1/categories/:id", categoryController.findOne);
  app.get("/ecomm/api/v1/categories", categoryController.findAll);
};
