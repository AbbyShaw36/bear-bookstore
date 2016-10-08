var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var dao = {};

/*
 * 新建作者
 * @param {obj/array} author 作者对象或者作者名称数组
 * @param {function} cb 回调函数
 * */
dao.create = function(author, cb) {
  var name = author.getName();
  var sql = "INSERT INTO author(name) VALUES(?)";
  var inserts = [name];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[create author error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[create author result]---------------");
    console.log(result);

    cb(null, {
      id: result.insertId
    });
  });
};

/*
 * 更新作者信息
 * @param {obj} author 作者对象
 * @param {function} cb 回调函数
 * */
dao.update = function(author, cb) {
  var id = author.getId();
  var name = author.getName();
  var sql = "UPDATE FROM author SET name=? WHERE id=?";
  var inserts = [name, id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[update author error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[update author result]----------------");
    console.log(result);

    cb(null, {
      row: result.affectedRows
    });
  });
};

/*
 * 删除作者
 * @param {obj} author 作者对象
 * @param {function} cb 回调函数
 * */
dao.delete = function(author, cb) {
  var id = author.getId();
  var sql = "DELETE FROM author WHERE id=?";
  var inserts = [id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[delete author error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[delete author result]-------------");
    console.log(result);

    cb(null, {
      row: result.affectedRows
    });
  });
};

/*
 * 获取作者列表
 * @param {obj} list 列表对象
 * @param {function} function 回调函数
 * */
dao.getList = function(list, cb) {
  var author = list.getContent();
  var name = author.getName();
  var limit = list.getLimit();
  var offset = list.getOffset();
  var sortby = list.getSortby();
  var order = list.getOrder();
  var sql = "SELECT id,name FROM author";
  var inserts = [];

  if (name) {
    sql += " WHERE name=?";
    inserts.push(name);
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
      logger.error("[get author list error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get author list result]----------------");
    console.log(result);

    cb(null, {
      list: result
    });
  });
};

exports.dao = dao;
