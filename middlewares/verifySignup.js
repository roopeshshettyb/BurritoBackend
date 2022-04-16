const db = require("../models");

const checkDuplicateUsernameorEmail = (req, res, next) => {
  db.user
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Username Already exists" });
        return;
      }
      db.user
        .findOne({
          where: {
            email: req.body.email,
          },
        })
        .then((user) => {
          if (user) {
            res.status(400).send({ message: "Email Already exists" });
            return;
          }
          next();
        });
    });
};

checkRolesExists = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!db.ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Invalid Role",
        });
        return;
      }
    }
    next();
  } else {
    next();
  }
};

module.exports = {
  checkDuplicateUsernameorEmail,
  checkRolesExists,
};
