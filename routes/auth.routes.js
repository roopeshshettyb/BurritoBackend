const controller = require("../controllers/auth.controller");
const { auth } = require("../middlewares");

modules.exports = function (app) {
  app.use(function (req, res, next) {
    req.header(
      "Access-Control-Allow-Header",
      "x-access-token,Origin,Content-Type,Accept"
    );
    next();
  });

  app.post("/ecomm/api/v1/auth/signup", controller.signup);
  app.post("/ecomm/api/v1/auth/signin", controller.signin);
};
