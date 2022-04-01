const app = require("../app");

const categoryController = require("../controllers/category.controller");

app.post("/ecomm/api/v1/categories/create", categoryController.create);
app.put("/ecomm/api/v1/categories/update/:id", categoryController.update);
app.delete("/ecomm/api/v1/categories/:id", categoryController.deleteCategory);
app.get("/ecomm/api/v1/categories/:id", categoryController.findOne);
app.get("/ecomm/api/v1/categories/all", categoryController.findAll);
