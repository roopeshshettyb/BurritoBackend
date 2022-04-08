const jwt = require("jsonwebtoken");

const config = require("../config/auth.config");
const { user } = require("../models");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Token is not received" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  user.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "This requires admin access" });
    });
  });
};

const auth = {
  verifyToken,
  isAdmin,
};

module.exports = auth;
