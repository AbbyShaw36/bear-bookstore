var admin = require("../web/admin").admin;
var book = require("../web/book").book;

exports.handle = {
  "/api/admin/sign": {
    "POST": admin.signin,
    "DELETE": admin.signup
  },
  "/api/admin/book": {
    "POST": book.create,
    "GET": book.get,
    "PUT": book.update,
    "DELETE": book.delete
  },
  "/api/admin/book/stock": {
    "PUT": book.updateStock
  }
};
