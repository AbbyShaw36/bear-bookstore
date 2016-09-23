var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var dao = {};

/*
 * 创建书籍作者关系
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.create = function(book, cb) {
  var id = book.getId();
  var authorArr = book.getAuthor();
  var sql = "INSERT INTO book_author(book,author) VALUES";
  var inserts = [];

  // 用于循环
  var arr = [];
  var author = null;

  for (author in authorArr) {
    arr.push("(?,?)");
    inserts = inserts.concat(id, author);
  }

  sql += arr.join(",");
  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[create book author error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[create book author result]---------------------");
    console.log(result);

    cb(null, result);
  });
};

exports.dao = dao;
