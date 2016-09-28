var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var dao = {};

/*
 * 新增类型
 * @param {obj} type 类型对象
 * @param {function} cb 回调函数
 * */
dao.create = function(type, cb) {
  var name = type.getName();
  var sql = "INSERT INTo type(name) VAUEST(?)";
  var inserts = [name];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[create type error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[create type result]-----------------");
    console.log(result);

    cb(null, {
      id: result.insertId
    });
  });
};

/*
 * 获取类型列表
 * @param {obj} list 列表对象
 * @param {function} cb 回调函数
 * */
dao.getList = function(list, cb) {
  var type = list.getContent();
  var name = type.getName();
  var limit = list.getLimit();
  var offset = list.getOffset();
  var sortby = list.getSortby();
  var order = list.getOrder();
  var sql = "SELECT id,name FROM type";
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
    inserts.push(limit);
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
      logger.error("[get type list error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get type list result]----------------");
    console.log(result);

    cb(null, {
      list: result
    });
  });
};

/*
 * 删除类型
 * @param {obj} type 类型对象
 * @param {function} cb 回调函数
 * */
dao.delete = function(type, cb) {
  var id = type.getId();
  var sql = "DELETE FROM type WHERE id=?";
  var inserts = [id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[delete type error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[delete type result]---------------");
    console.log(result);

    cb(null, {
      row: result.affectedRows
    });
  });
};

exports.dao = dao;
