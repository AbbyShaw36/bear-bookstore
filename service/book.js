var bookDao = require("../dao/book").dao;
var typeDao = require("../dao/type").dao;
var bookTypeDao = require("../dao/book_type").dao;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var Type = require("../model/type").Type;
var Author = require("../model/author").Author;
var service = {};

service.create = function(book, cb) {
  bookDao.create(book, function(err, result) {
    var typeArr = null;

    var i = 0;
    var length = 0;
    var oldTypeArr = [];
    var newTypeArr = [];

    if (err) {
      cb(err);
      return;
    }

    book.setId(result.id);
    typeArr = book.getType();
    length = typeArr.length;

    for (i; i < length; i++) {
      if (typeof typeArr[i] === "number") {
        oldTypeArr.push(typeArr[i]);
        continue;
      }

      if (typeof typeArr[i] === "string") {
        newTypeArr.push(typeArr[i]);
      }
    }

    typeDao.createArr(newTypeArr, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      oldTypeArr = oldTypeArr.concat(result.idArr);
      book.setType(oldTypeArr);

      bookTypeDao.create(book, function(err, result) {
        if (err) {
          cb(err);
          return;
        }
      });
    });
  });
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
