var logger = require("../util/logger").logger;
var error = require("../util/error");
var getQuery = require("../util/getQuery").getQuery;
var Book = require("../model/book").Book;
var service = require("../service/book").service;

exports.create = function(req, res, cb) {
  getQuery(req, function(query) {
    var name = query.name;
    var type = query.type;
    var author = query.author;
    var stock = query.stock;
    var price = query.price;
    var description = query.description;
    var book = null;

    if (!name) {
      logger.warn("[create book error] - " + error.bookNameNotProvided.description);
      cb(error.bookNameNotProvided);
      return;
    }

    if (!price) {
      logger.warn("[create book error] - " + error.bookPriceNotProvided
        .description);
      cb(error.bookPriceNotProvided);
      return;
    }

    book = new Book();
    book.setName(name);
    book.setType(type);
    book.setAuthor(author);
    book.setStock(stock);
    book.setPrice(price);
    book.setDescription(description);

    service.create(book, cb);
  });
};
