let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then((user) => {
      console.log(`>> User name [${req.body.username}] got inserted in db`);
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res
              .status(200)
              .send({ message: "User added and Role given succesffully" });
          });
        });
      } else {
        Role.findAll({
          where: {
            name: "customer",
          },
        }).then((role) => {
          user.setRoles(role).then((resp) => {
            //console.log(resp.dataValues);
            console.log(`>> User name [${req.body.username}] got roles`);

            res
              .status(201)
              .send({ message: "User added and Role given succesffully" });
          });
        });
      }
    })
    .catch((err) => {
      console.log(">> Error in User Sign up ->", err);
      res.status(500).send({
        message: ">> Error in User Sign up",
        err,
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      var isValidPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).send({ message: "Invalid Password" });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 99999,
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        //console.log(roles);
        for (let i = 0; i < roles.length; i++) {
          //console.log(">>", roles[i].dataValues.name);
          authorities.push("ROLE_" + roles[i].dataValues.name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Internal server error while sign in", err });
    });
};
