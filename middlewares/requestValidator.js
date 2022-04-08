const { category } = require("../models");

const validateCategoryRequest = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of category can't be empty",
    });
    return;
  }
  next();
};

const validateProductRequest = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).send({
      message: "Name/Price/CatId of product can't be empty",
    });
    return;
  } else {
    if (req.body.categoryId) {
      category.findByPk(req.body.categoryId).then((response) => {
        if (!response) {
          res.status(400).send({
            message: "Cant find category",
          });
          return;
        } else {
          if (req.body.price <= 0) {
            res.status(400).send({
              message: "Price is wrong",
            });
            return;
          } else {
            next();
          }
        }
      });
    } else {
      res.status(400).send({
        message: "Category ID it can't be empty",
      });
      return;
    }
  }
};

const validateCategoryInRequestParams = (req, res, next) => {
  const categoryId = req.params.categoryId;
  if (categoryId) {
    category
      .findByPk(categoryId)
      .then((response) => {
        if (!response) {
          res.status(400).send({
            message: "Category ID it can't be empty",
          });
          return;
        }
        next();
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some internal error occured",
        });
        return;
      });
  } else {
    res.status(400).send({
      message: "Category ID it can't be empty",
    });
    return;
  }
};

module.exports = {
  validateCategoryInRequestParams,
  validateCategoryRequest,
  validateProductRequest,
};
