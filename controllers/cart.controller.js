const db = require("../models");
const Cart = db.cart;

exports.create = (req, res) => {
  const newCart = {
    userId: req.userId,
  };

  Cart.create(newCart)
    .then((response) => {
      console.log(`>> Cart for user ID [${newCart.userId}] got inserted in db`);
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Cart Creation ->", err);
      res.status(500).send({
        message: ">> Error in Cart Creation",
        err,
      });
    });
};

exports.update = (req, res) => {
  const cartId = req.params.id;

  db.cart.findByPk(cartId).then((cart) => {
    db.product
      .findAll({
        where: {
          id: req.body.productIds,
        },
      })
      .then((productList) => {
        if (!productList) {
          res.status(400).send({
            message: "Product don't exist",
          });
          return;
        }
        cart.setProducts(productList).then(() => {
          let selectedProducts = [];
          let totalCost = 0;
          cart.getProducts().then((products) => {
            for (let i = 0; i < products.length; i++) {
              totalCost = totalCost + products[i].price;
              selectedProducts.push({
                id: products[i].id,
                name: products[i].name,
                cost: products[i].price,
              });
            }
            //setting cost
            newCart = {
              cost: totalCost,
            };
            Cart.update(newCart, {
              where: { id: cartId },
            })
              .then((response) => {
                console.log(`>> Cart ID is [${cartId}] got updated in db`);
              })
              .catch((err) => {
                console.log(">> Error in Cart Updation");
                res.status(500).send({
                  message: ">> Error in Cart Updation",
                });
              });
            //==
            res.status(200).send({
              id: cartId,
              products: selectedProducts,
              price: totalCost,
            });
          });
        });
      });
  });
};

exports.deleteCart = (req, res) => {
  const cartId = req.params.id;

  Cart.destroy({
    where: { id: cartId },
  })
    .then((response) => {
      console.log(`>> Cart ID is [${cartId}] got deleted from db`);
      res.sendStatus(201).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Cart deletion", err);
      res.status(500).send({
        message: ">> Error in Cart deletion",
      });
    });
};

exports.getCart = (req, res) => {
  const cartId = req.params.id;
  Cart.findByPk(cartId)
    .then((cart) => {
      if (!cart) {
        res.status(400).send({
          message: "cart doesn't exist",
        });
        return;
      }
      let selectedProducts = [];
      let totalCost = 0;
      cart.getProducts().then((products) => {
        for (let i = 0; i < products.length; i++) {
          totalCost = totalCost + products[i].price;
          selectedProducts.push({
            id: products[i].id,
            name: products[i].name,
            cost: products[i].price,
          });
        }
        res.status(200).send({
          id: cartId,
          products: selectedProducts,
          price: totalCost,
        });
      });
    })
    .catch((err) => {
      console.log(">> Error in Cart find", err);
      res.status(500).send({
        message: ">> Error in Cart find",
      });
    });
};

exports.findAll = (req, res) => {
  let cartName = req.query.name;
  let promise;
  if (cartName) {
    promise = Cart.findAll({
      where: {
        name: cartName,
      },
    });
  } else {
    promise = Cart.findAll();
  }
  promise
    .then((response) => {
      //console.log("Promise response", response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(">> Error in Cart find all", err);
      res.status(500).send({
        message: ">> Error in Cart find all",
      });
    });
};

exports.getCartsUnderCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  Cart.findAll({
    where: {
      categoryId: categoryId,
    },
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: ">> Error in Cart find all by cat",
      });
    });
};
