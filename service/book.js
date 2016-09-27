var bookDao = require("../dao/book").dao;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var service = {};

service.create = function(book, cb) {
  bookDao.create(book, cb);
};

service.update = function(book, cb) {
  bookDao.update(book, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.row === 0) {
      logger.warn("[update book error] - " + error.bookNotExists.description);
      cb(error.bookNotExists);
      return;
    }

    cb(null, result);
  });
};

service.delete = function(book, cb) {
  bookDao.delete(book, cb);
};

exports.service = service;
