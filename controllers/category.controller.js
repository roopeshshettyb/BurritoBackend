const db = require("../models");
const Category = db.category;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of category can't be empty",
    });
    return;
  }

  const newCategory = {
    name: req.body.name,
    description: req.body.description,
  };

  Category.create(newCategory)
    .then((response) => {
      console.log(`>> Category name is [${category.name}] got inserted in db`);
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Category Creation");
      res.status(500).send({
        message: ">> Error in Category Creation",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of category can't be empty",
    });
    return;
  }

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
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of category can't be empty",
    });
    return;
  }

  const newCategory = {
    name: req.body.name,
    description: req.body.description,
  };

  const categoryId = req.params.id;

  Category.destroy(newCategory, {
    where: { id: categoryId },
  })
    .then((response) => {
      console.log(`>> Category name is [${category.name}] got deleted from db`);
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Category deletion");
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
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Category find all");
      res.status(500).send({
        message: ">> Error in Category find all",
      });
    });
};
