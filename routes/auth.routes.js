const controller = require("../controllers/auth.controller");
const { auth, verifySignup } = require("../middlewares");

module.exports = function (app) {
  app.post(
    "/ecomm/api/v1/auth/signup",
    verifySignup.checkRolesExists,
    verifySignup.checkDuplicateUsernameorEmail,
    controller.signup
  );
  app.post("/ecomm/api/v1/auth/signin", controller.signin);
};
