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

/*
 * 删除书籍作者关系
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.delete = function(book,cb) {
  var id = book.getId();
  var sql = "DELETE FROM book_author WHERE book=?";
  var inserts = [id];

  sql = mysql.format(sql,inserts);
  console.log(sql);

  connection.query(sql,function(err,result) {
    if (err) {
      logger.error("[delete book author error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[delete book author result]-----------------------");
    console.log(result);

    cb(null,result);
  });
};

/*
 * 更新书籍作者关系
 * 先删除后创建
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.update = function(book,cb) {
  dao.delete(book,function(err,result) {
    if (err) {
      cb(err);
      return;
    }

    logger.trance("[delete book author success]--------------------");
    console.log(result);

    dao.create(book,cb);
  });
};

/*
 * 通过书籍id获取书籍作者
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.getByBook = function(book,cb) {
  var id = book.getId();
  var sql = "SELECT author.id,author.name FROM book_author,author WHERE book_author.author=author.id AND  book_author.book=?";
  var inserts = [id];

  sql = mysql.format(sql,inserts);
  console.log(sql);

  connection.query(sql,function(err,result) {
    if (err) {
      logger.error("[get book author by book error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get book author by book result]--------------------");
    console.log(result);

    cb(null,{
      authors: result
    });
  });
};

/*
 * 通过作者获取作者书籍
 * @param {obj} author 作者模型
 * @param {function} cb 回调函数
 * */
dao.getByAuthor = function(author,cb) {
  var id = author.getId();
  var sql = "SELECT book.id,book.name FROM book_author,book WHERE book_author.book=book.id AND book_author.author=?";
  var inserts = [id];

  sql = mysql.format(sql,inserts);
  console.log(sql);

  connection.query(sql,function(err,result) {
    if (err) {
      logger.error("[get book author by author error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get book author by author result]-------------------------");
    console.log(result);

    cb(null,{
      books: result
    });
  });
};

exports.dao = dao;
