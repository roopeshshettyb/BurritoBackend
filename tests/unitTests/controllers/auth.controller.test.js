/* Tests for sign up

 1.1 Successful sign up when user provides role
 1.2 Successful sign up when user doesn't provide any role
 2 Failed sign up when user is providing wrong role
*/

const Models = require("../../../models");
const User = Models.user;
const Role = Models.role;
const authController = require("../../../controllers/auth.controller");
const newUser = require("../mockData/newUser.json");
const user = require("../mockData/user.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../../config/auth.config");

const { mockRequest, mockResponse } = require("../interceptor");

describe("Tests for sign up of auth controller", () => {
  it("1.1 Successful sign up when user provides role", async () => {
    let req = mockRequest();
    let res = mockResponse();
    req.body = newUser.role;
    const resFromCreate = {
      setRoles: async () => Promise.resolve(),
    };
    const spyOnCreate = jest
      .spyOn(User, "create")
      .mockImplementation(() => Promise.resolve(resFromCreate));
    const spyOnFindAll = jest
      .spyOn(Role, "findAll")
      .mockImplementation(() => Promise.resolve());

    await authController.signup(req, res);

    //Validating if the test is passing successfully or not

    await expect(spyOnCreate).toHaveBeenCalled();
    await expect(spyOnFindAll).toHaveBeenCalled();
    await expect(User.create).toHaveBeenCalled();
    await expect(Role.findAll).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "User added and Role given succesffully",
    });
  });
  it("1.2 Successful sign up when user doesn't provide any role", async () => {
    let req = mockRequest();
    let res = mockResponse();
    req.body = newUser.noRole;
    const resFromCreate = {
      setRoles: async () => Promise.resolve(),
    };
    const spyOnCreate = jest
      .spyOn(User, "create")
      .mockImplementation(() => Promise.resolve(resFromCreate));
    const spyOnFindAll = jest
      .spyOn(Role, "findAll")
      .mockImplementation(() => Promise.resolve());

    await authController.signup(req, res);

    //Validating if the test is passing successfully or not

    await expect(spyOnCreate).toHaveBeenCalled();
    await expect(spyOnFindAll).toHaveBeenCalled();
    await expect(User.create).toHaveBeenCalled();
    await expect(Role.findAll).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "User added and Role given succesffully",
    });
  });
  // it("2 Failed sign up when user is providing wrong role", async () => {
  //   let req = mockRequest();
  //   let res = mockResponse();
  //   req.body = newUser.noPassword;
  //   const resFromCreate = {
  //     setRoles: async () => Promise.resolve(),
  //   };
  //   const spyOnCreate = jest
  //     .spyOn(User, "create")
  //     .mockImplementation(() => Promise.resolve(resFromCreate));
  //   await authController.signup(req, res);

  //   //Validating if the test is passing successfully or not

  //   await expect(spyOnCreate).toHaveBeenCalled();
  //   await expect(spyOnFindAll).toHaveBeenCalled();
  //   await expect(User.create).toHaveBeenCalled();
  //   await expect(Role.findAll).toHaveBeenCalled();

  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.send).toHaveBeenCalledWith({
  //     message: ">> Error in User Sign up",
  //   });
  // });
});

describe("Tests for sign in of auth controller", () => {
  it("1.1 Successful sign in ", async () => {
    let req = mockRequest();
    let res = mockResponse();
    req.body = user;
    const userHashedPassword = bcrypt.hashSync(req.body.password, 10);
    const roles = [
      {
        id: 1,
        name: "customer",
      },
    ];
    const resFromFindOne = {
      ...user,
      password: userHashedPassword,
      getRoles: async () => Promise.resolve(roles),
    };
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 99999,
    });
    const resFromSignin = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: ["ROLE_CUSTOMER"],
      accessToken: token,
    };
    const spyOnFindOne = jest
      .spyOn(User, "findOne")
      .mockImplementation(() => Promise.resolve(resFromFindOne));

    await authController.signin(req, res);
    await expect(spyOnFindOne).toHaveBeenCalled();
    await expect(User.findOne).toHaveBeenCalled();
    await expect(User.findOne).toHaveBeenCalledTimes(1);
    await expect(res.status).toHaveBeenCalled();
    await expect(res.status).toHaveBeenCalledWith(200);
    await expect(res.send).toHaveBeenCalled();
    await expect(res.send).toHaveBeenCalledWith(resFromSignin);
  });

  it("1.2 User doesn't exist ", async () => {
    let req = mockRequest();
    let res = mockResponse();
    req.body = user;
    const resFromSignin = {
      message: "User not found",
    };
    const spyOnFindOne = jest
      .spyOn(User, "findOne")
      .mockImplementation(() => Promise.resolve());

    await authController.signin(req, res);
    await expect(spyOnFindOne).toHaveBeenCalled();
    await expect(User.findOne).toHaveBeenCalled();
    await expect(res.status).toHaveBeenCalled();
    await expect(res.status).toHaveBeenCalledWith(404);
    await expect(res.send).toHaveBeenCalled();
    await expect(res.send).toHaveBeenCalledWith(resFromSignin);
  });
  it("1.3 Wrong password ", async () => {
    let req = mockRequest();
    let res = mockResponse();
    req.body = user;
    const userHashedPassword = bcrypt.hashSync(req.body.password, 10);
    const roles = [
      {
        id: 1,
        name: "customer",
      },
    ];
    const resFromFindOne = {
      ...user,
      password: userHashedPassword,
      getRoles: async () => Promise.resolve(roles),
    };
    const resFromSignin = {
      message: "Invalid Password",
    };
    const spyOnFindOne = jest
      .spyOn(User, "findOne")
      .mockImplementation(() => Promise.resolve(resFromFindOne));

    req.body.password = "wrong";
    await authController.signin(req, res);
    await expect(spyOnFindOne).toHaveBeenCalled();
    await expect(User.findOne).toHaveBeenCalled();
    await expect(res.status).toHaveBeenCalled();
    await expect(res.status).toHaveBeenCalledWith(401);
    await expect(res.send).toHaveBeenCalled();
    await expect(res.send).toHaveBeenCalledWith(resFromSignin);
  });
});
