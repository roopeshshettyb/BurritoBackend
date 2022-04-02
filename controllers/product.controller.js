const db = require("../models");
const Product = db.product;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).send({
      message: "Name/Price of product can't be empty",
    });
    return;
  }

  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  Product.create(newProduct)
    .then((response) => {
      console.log(`>> Product name is [${newProduct.name}] got inserted in db`);
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Product Creation ->", err);
      res.status(500).send({
        message: ">> Error in Product Creation",
        err,
      });
    });
};

exports.update = (req, res) => {
  if (req.body.name == "" || req.body.price < 0) {
    res.status(400).send({
      message: "Name/Price of product can't be empty",
    });
    return;
  }

  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  const productId = req.params.id;

  Product.update(newProduct, {
    where: { id: productId },
  })
    .then((response) => {
      console.log(`>> Product name is [${product.name}] got inserted in db`);
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Product Updation");
      res.status(500).send({
        message: ">> Error in Product Updation",
      });
    });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;

  Product.destroy({
    where: { id: productId },
  })
    .then((response) => {
      console.log(`>> Product name is [${Product.name}] got deleted from db`);
      res.sendStatus(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Product deletion", err);
      res.status(500).send({
        message: ">> Error in Product deletion",
      });
    });
};

exports.findOne = (req, res) => {
  const productId = req.params.id;
  Product.findByPk(productId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Product find");
      res.status(500).send({
        message: ">> Error in Product find",
      });
    });
};

exports.findAll = (req, res) => {
  let productName = req.query.name;
  let promise;
  if (productName) {
    promise = Product.findAll({
      where: {
        name: productName,
      },
    });
  } else {
    promise = Product.findAll();
  }
  promise
    .then((response) => {
      //console.log("Promise response", response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Product find all", err);
      res.status(500).send({
        message: ">> Error in Product find all",
      });
    });
};
