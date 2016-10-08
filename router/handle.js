var admin = require("../web/admin");
var book = require("../web/book");
var type = require("../web/type");
var author = require("../web/author");

exports.handle = {
  "/api/admin/sign": {
    "POST": admin.signin,
    "DELETE": admin.signout
  },
  "/api/admin/book": {
    "POST": book.create,
    "GET": book.get,
    "PUT": book.update,
    "DELETE": book.delete
  },
  "/api/admin/book/stock": {
    "PUT": book.updateStock
  },
  "/api/admin/type": {
    "POST": type.create,
    "PUT": type.update
  },
  "/api/admin/type/list": {
    "GET": type.getList
  },
  "/api/admin/author": {
    "POST": author.create,
    "PUT": author.update
  },
  "/api/admin/author/list": {
    "GET": author.getList
  }
};
