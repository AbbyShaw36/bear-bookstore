var pug = require("pug");
var sessionDao = require("../dao/session").dao;

exports.signin = function(cb) {
  var html = pug.renderFile("view/tpls/admin/signin.pug");

  cb(null, html);
};

exports.index = function(cb) {
  var html = pug.renderFile("view/tpls/admin/index.pug", {
    title: "后台管理系统-首页"
  });

  cb(null, html);
};

exports.bookList = function(cb) {
  var html = pug.renderFile("view/tpls/admin/booolist.pug", {
    title: "后台管理系统-书籍管理"
  });

  cb(null, html);
};

exports.addBook = function(cb) {
  var html = pug.renderFile("view/tpls/admin/book.pug", {
    title: "后台管理系统-书籍管理-新增"
  });

  cb(null, html);
};

exports.updateBook = function(cb) {
  var html = pug.renderFile("view/tpls/admin/book.pug", {
    title: "后台管理系统-书籍管理-编辑"
  });

  cb(null, html);
};

exports.orderList = function(cb) {
  var html = pug.renderFile("view/tpls/admin/orderlist.pug", {
    title: "后台管理系统-订单管理"
  });

  cb(null, html);
}
