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
  it("2 Failed sign up when user is providing wrong role", async () => {
    let req = mockRequest();
    let res = mockResponse();
    req.body = newUser.wrongRole;
    const resFromCreate = {
      setRoles: async () => Promise.resolve(),
    };
    const spyOnCreate = jest
      .spyOn(User, "create")
      .mockImplementation(() => Promise.resolve(resFromCreate));
    await authController.signup(req, res);

    //Validating if the test is passing successfully or not

    await expect(spyOnCreate).toHaveBeenCalled();
    await expect(spyOnFindAll).toHaveBeenCalled();
    await expect(User.create).toHaveBeenCalled();
    await expect(Role.findAll).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: ">> Error in User Sign up",
    });
  });
});
