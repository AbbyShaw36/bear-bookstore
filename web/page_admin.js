var cookie = require("cookie");
var User = require("../model/user").User;
var page = require("../service/page_admin");
var getQuery = require("../util/getQuery").getQuery;
var Book = require("../model/book").Book;

exports.signin = function(req, res, cb) {
  page.signin(cb);
};

exports.index = function(req, res, cb) {
  page.index(cb);
};

exports.bookList = function(req, res, cb) {
  page.bookList(cb);
};

exports.book = function(req, res, cb) {
  getQuery(req, function(query) {
    var id = query.id;
    var book = null;

    if (id) {
      book = new Book();
      book.setId(id);
      page.updateBook(book, cb);
      return;
    }

    page.addBook(cb);
  });
};
