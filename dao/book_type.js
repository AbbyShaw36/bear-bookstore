var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var dao = {};

/*
 * 创建书籍类型关系
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.create = function(book, cb) {
  var id = book.getId();
  var typeArr = book.getType();
  var sql = "INSERT INTO book_type(book,type) VALUES";
  var inserts = [];

  // 用于循环
  var arr = [];
  var type = null;

  // 循环创建sql语句
  for (type in typeArr) {
    arr.push("(?,?)");
    inserts = inserts.concat(id, type);
  }

  sql += arr.join(",");
  sql = mysql.format(sql, inserts);
  console.log(sql);

  // 执行sql语句
  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[create book type error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[create book type result]-----------------");
    console.log(result);

    // 回调返回执行结果
    cb(null, result);
  });
};

/*
 * 删除书籍类型关系
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.delete = function(book, cb) {
  var id = book.getId();
  var sql = "DELETE FROM book_type WHERE book=?";
  var inserts = [id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[delete book type error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[delete book type result]------------------------");
    console.log(result);

    cb(null, {
      row: result.affectedRows
    });
  });
};

/*
 * 更新书籍类型关系
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.update = function(book, cb) {
  dao.delete(book, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    logger.trace("[delete book type success]--------------------");
    console.log(result);

    dao.create(book, cb);
  });
};

/*
 * 通过书籍id获取书籍类型
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.getByBook = function(book, cb) {
  var id = book.getId();
  var sql =
    "SELECT type.id,type.name FROM book_type,type WHERE book_type.type=type.id AND book_type.book=?";
  var inserts = [id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get book type by book error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get book type by book result]--------------------");
    console.log(result);

    cb(null, {
      types: result
    });
  });
};

/*
 * 通过类型获取相应书籍
 * @param {obj} type 类型模型
 * @param {function} cb 回调函数
 * */
dao.getByType = function(type, cb) {
  var id = type.getId();
  var sql =
    "SELECT book.id,book.name FROM book_type,book WHERE book_type.book=book.id AND book_type.type=?";
  var inserts = [id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get book type by type error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get book type by type result]---------------------");
    console.log(result);

    cb(null, {
      books: result
    });
  });
};

exports.dao = dao;
