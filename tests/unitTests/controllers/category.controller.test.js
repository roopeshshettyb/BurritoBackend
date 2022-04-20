const Models = require("../../../models");
const Category = Models.category;

const categoryController = require("../../../controllers/category.controller");
const category = require("../mockData/category.json");
const { mockRequest, mockResponse } = require("../interceptor");
var req = mockRequest();
var res = mockResponse();
describe("Tests for category creation", () => {
  beforeEach(() => {
    req.params = {
      id: 1,
    };
  });

  it("1.1 Successful category creation", async () => {
    req.body = category.create;
    abc = category.create;
    const expectedResponse = {
      ...abc,
      id: 1,
    };
    const spyOnCreate = jest
      .spyOn(Category, "create")
      .mockImplementation((abc) => Promise.resolve(expectedResponse));
    await categoryController.create(req, res);
    expect(spyOnCreate).toHaveBeenCalled();
    expect(Category.create).toHaveBeenCalled();
    expect(Category.create).toHaveBeenCalledWith(category.create);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ message: "Category created" });
  });
  it("1.2 Category creation failed", async () => {
    req.body = category.create;
    abc = category.create;
    const expectedResponse = {
      ...abc,
      id: 1,
    };
    const spyOnCreate = jest
      .spyOn(Category, "create")
      .mockImplementation(() => Promise.reject(Error("Error")));
    await categoryController.create(req, res);
    await expect(spyOnCreate).toHaveBeenCalled();
    await expect(Category.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: ">> Error in Category Creation",
    });
  });
});

describe("Tests for category updation", () => {
  beforeEach(() => {
    req.body = category.create;
    req.params = {
      id: 1,
    };
  });

  it("1.1 Successful category updation", async () => {
    const spyOnUpdate = jest
      .spyOn(Category, "update")
      .mockImplementation(() => Promise.resolve(req.body));
    await categoryController.update(req, res);
    await expect(spyOnUpdate).toHaveBeenCalled();
    await expect(Category.update).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(category.update);
  });
});
