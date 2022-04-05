const db = require("../models");
const Category = db.category;

exports.create = (req, res) => {
  const newCategory = {
    name: req.body.name,
    description: req.body.description,
  };

  Category.create(newCategory)
    .then((response) => {
      console.log(
        `>> Category name is [${newCategory.name}] got inserted in db`
      );
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Category Creation ->", err);
      res.status(500).send({
        message: ">> Error in Category Creation",
        err,
      });
    });
};

exports.update = (req, res) => {
  const newCategory = {
    name: req.body.name,
    description: req.body.description,
  };

  const categoryId = req.params.id;

  Category.update(newCategory, {
    where: { id: categoryId },
  })
    .then((response) => {
      console.log(`>> Category name is [${category.name}] got inserted in db`);
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Category Updation");
      res.status(500).send({
        message: ">> Error in Category Updation",
      });
    });
};

exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id;

  Category.destroy({
    where: { id: categoryId },
  })
    .then((response) => {
      console.log(`>> Category name is [${Category.name}] got deleted from db`);
      res.sendStatus(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Category deletion", err);
      res.status(500).send({
        message: ">> Error in Category deletion",
      });
    });
};

exports.findOne = (req, res) => {
  const categoryId = req.params.id;
  Category.findByPk(categoryId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Category find");
      res.status(500).send({
        message: ">> Error in Category find",
      });
    });
};

exports.findAll = (req, res) => {
  let categoryName = req.query.name;
  let promise;
  if (categoryName) {
    promise = Category.findAll({
      where: {
        name: categoryName,
      },
    });
  } else {
    promise = Category.findAll();
  }
  promise
    .then((response) => {
      //console.log("Promise response", response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Category find all", err);
      res.status(500).send({
        message: ">> Error in Category find all",
      });
    });
};
