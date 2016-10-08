var bookDao = require("../dao/book").dao;
var bookTypeDao = require("../dao/book_type").dao;
var bookAuthorDao = require("../dao/book_author").dao;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var service = {};

/* 
 * 新增书籍
 * 将书籍对象交给dao层执行保存数据
 * 获取执行结果书籍id
 * 保存书籍类型关系和书籍作者关系
 * 返回书籍id
 * @param {obj} book 书籍对象
 * @param {function} cb 回调函数
 * */
service.create = function(book, cb) {
  // 保存书籍数据
  bookDao.create(book, function(err, result) {
    var bookId = null;

    if (err) {
      cb(err);
      return;
    }

    // 保存书籍id
    bookId = result.id;
    book.setId(bookId);

    // 保存书籍类型关系
    bookTypeDao.create(book, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      // 保存书籍作者关系
      bookAuthorDao.create(book, function(err, result) {
        if (err) {
          cb(err);
          return;
        }

        // 回调返回书籍id
        cb(null, {
          id: bookId
        });
      });
    });
  });
};

/*
 * 获取书籍
 * 将书籍对象提交给dao层获取书籍数据
 * 通过书籍id获取书籍类型和书籍作者
 * 将所有数据保存到新的书籍对象中返回
 * @param {obj} book 书籍对象
 * @param {function} cb 回调函数
 * */
service.get = function(book, cb) {
  // 获取书籍数据
  bookDao.get(book, function(err, result) {
    var bookResult = null;

    if (err) {
      cb(err);
      return;
    }

    bookResult = result.book;

    // 判断获取书籍数据结果是否为空
    if (!bookResult) {
      logger.trace("[get book error] - " + error.bookNotExists.description);
      cb(error.bookNotExists);
      return;
    }

    // 获取书籍类型
    bookTypeDao.getByBook(book, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      bookResult.types = result.types;

      // 获取书籍作者
      bookAuthorDao.getByBook(book, function(err, result) {
        if (err) {
          cb(err);
          return;
        }

        bookResult.authors = result.authors;

        // 回调返回新的书籍对象
        cb(null, {
          book: bookResult
        });
      });
    });
  });
};

/*
 * 更新书籍信息
 * 更新书籍基本信息，书籍类型，书籍作者
 * 执行成功返回空对象
 * @param {obj} book 书籍对象
 * @param {function} cb 回调函数
 * */
service.update = function(book, cb) {
  // 更新书籍基本信息
  bookDao.update(book, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    // 判断是否有更新行数
    if (result.row === 0) {
      logger.warn("[update book error] - " + error.bookNotExists.description);
      cb(error.bookNotExists);
      return;
    }

    // 更新书籍类型
    bookTypeDao.update(book, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      // 更新书籍作者
      bookAuthorDao.update(book, function(err, result) {
        if (err) {
          cb(err);
          return;
        }

        // 回调返回空对象
        cb(null, {});
      });
    });
  });
};

/*
 * 删除书籍
 * 删除书籍基础信息、书籍类型、书籍作者
 * 执行成功返回空对象
 * @param {obj} book 书籍对象
 * @param {obj} cb 回调函数
 * */
service.delete = function(book, cb) {
  // 删除书籍基础信息
  bookDao.delete(book, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    // 判断是否有删除书籍函数
    if (result.row === 0) {
      logger.warn("[delete book error] - " + error.bookNotExists.description);
      cb(error.bookNotExists);
      return;
    }

    // 删除书籍类型
    bookTypeDao.delete(book, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      // 删除书籍作者
      bookAuthorDao.delete(book, function(err, result) {
        if (err) {
          cb(err);
          return;
        }

        // 回调返回空对象
        cb(null, {});
      });
    });
  });
};

/*
 * 更新书籍库存
 * 执行成功返回空对象
 * @param {obj} book 书籍对象
 * @param {function} cb 回调函数
 * */
service.updateStock = function(book, cb) {
  // 更新库存
  bookDao.updateStock(book, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    // 判断是否有更新行数
    if (result.row === 0) {
      logger.warn("[update book stock error] - " + error.bookNotExists.description);
      cb(error.bookNotExists);
      return;
    }

    // 回调返回空对象
    cb(null, {});
  });
};

exports.service = service;
