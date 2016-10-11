var admin = require("../web/admin");
var book = require("../web/book");
var type = require("../web/type");
var author = require("../web/author");
var order = require("../web/order");
var user = require("../web/user");
var page_admin = require("../web/page_admin");

exports.handle = {
  // 接口请求
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
  },
  "/api/admin/orderform": {
    "PUT": order.updateStatus,
    "GET": order.get
  },
  "/api/admin/orderform/list": {
    "GET": order.getList
  },
  "/api/user": {
    "POST": user.signup,
  },
  "/api/user/sign": {
    "POST": user.signin,
    "DELETE": user.signout
  },
  "/api/book": {
    "GET": book.get
  },


  // 页面请求
  "/admin/sign": {
    "GET": page_admin.signin
  },
  "/admin/index": {
    "GET": page_admin.index
  }
};
