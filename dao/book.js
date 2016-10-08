var mysql = require("mysql");
var connection = require("./mysql").connection;
var error = require("../util/error");
var logger = require("../util/logger").logger;
var dao = {};

/*
 * 创建书籍
 * @param {boj} book 书籍模型
 * @param {function} cb 回调函数
 * 返回值：书籍id
 * */
dao.create = function(book, cb) {
  var name = book.getName();
  var price = book.getPrice();
  var stock = book.getStock();
  var description = book.getDescription();
  var publishTime = new Date().getTime();
  var sql =
    "INSERT INTO book(name,price,stock,description,publishTime) VALUES(?,?,?,?,?)";
  var inserts = [name, price, stock, description, publishTime];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[create book error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trance("[create book result]------------------------");
    console.log(result);

    cb(null, {
      id: result.insertId
    });
  });
};

/*
 * 更新书籍
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * 返回值：更新行数
 * */
dao.update = function(book, cb) {
  var id = book.getId();
  var name = book.getName();
  var stock = book.getStock();
  var price = book.getPrice();
  var description = book.getDescription();
  var sql =
    "UPDATE book SET name=?,stock=?,price=?,description=? WHERE id=?";
  var inserts = [name, stock, price, description, id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[update book error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[update book result]-----------------------");
    console.log(result);

    cb(null, {
      row: result.affectedRows
    });
  });
};

/*
 * 更新书籍库存
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.updateStock = function(book, cb) {
  var id = book.getId();
  var stock = book.getStock();
  var sql = "UPDATE book SET stock=? WHERE id=?";
  var inserts = [stock, id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[update book stock error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[update book stock result]-----------------------");
    console.log(result);

    cb(null, {
      row: result.affectedRows
    });
  });
};

/*
 * 删除书籍
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.delete = function(book, cb) {
  var id = book.getId();
  var sql = "DELETE FROM book WHERE id=?";
  var inserts = [id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[delete book error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[delete book result]---------------");
    console.log(result);

    cb(null, {
      row: result.affectedRows
    });
  });
};

/*
 * 获取书籍
 * @param {obj} book 书籍模型
 * @param {function} cb 回调函数
 * */
dao.get = function(book, cb) {
  var id = book.getId();
  var sql = "SELECT * FROM book WHERE id=?";
  var inserts = [id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get book error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get book result]--------------------------");
    console.log(result);

    cb(null, {
      book: result[0]
    });
  });
};

/*
 * 获取书籍列表
 * @param {obj} list 列表模型
 * @param {function} cb 回调函数
 * */
dao.getList = function(list, cb) {
  var book = list.getContent();
  var name = book.getName();
  var price = book.getPrice();
  var stock = book.getStock();
  var publishTime = book.getPublishTime();
  var limit = list.getLimit();
  var offset = list.getOffset();
  var sortby = list.getSortby();
  var order = list.getOrder();
  var sql = "SELECT * FROM book";
  var inserts = [];
  var arr = [];

  if (name) {
    arr.push("name=?");
    inserts.push(name);
  }

  if (price) {
    arr = arr.concat("price>=?", "price<=?");
    inserts = inserts.concat(price.min, price.max);
  }

  if (stock) {
    arr = arr.concat("stock>=?", "stock<=?");
    inserts = inserts.concat(stock.min, stock.max);
  }

  if (publishTime) {
    arr = arr.concat("publishTime>=?", "publishTime<=?");
    inserts = inserts.concat(publishTime.min, publishTime.max);
  }

  if (arr.length > 0) {
    sql += " WHERE " + arr.join(" AND ");
  }

  if (limit) {
    sql += " LIMIT ?";
    inserts.push(limit);
  }

  if (offset) {
    sql += " OFFSET ?";
    inserts.push(offset);
  }

  if (sortby) {
    sql += " ORDER BY ?";
    inserts.push(sortby);
  }

  if (order) {
    sql += " ?";
    inserts.push(order);
  }

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get book list error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get book list result]---------------------");
    console.log(result);

    cb(null, {
      list: result
    });
  });
};
/* getList end */

exports.dao = dao;
