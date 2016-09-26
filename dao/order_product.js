var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var dao = {};

/*
 * 创建订单货品关系
 * @param {obj} orderForm 订单模型
 * @param {function} cb 回调函数
 * */
dao.create = function(orderForm, cb) {
  var code = orderForm.getCode();
  var productArr = orderForm.getProduct();
  var sql = "INSERT INTO order_product(code,product,quatity) VALUES";
  var inserts = [];

  // 用于循环
  var i = 0;
  var length = productArr.length;
  var arr = [];
  var product = {};
  var id = null;
  var quatity = null;

  for (i; i < length; i++) {
    product = productArr[i];
    id = product.id;
    quatity = product.quatity;

    arr.push("(?,?)");
    inserts = inserts.concat([code, id, quatity]);
  }

  sql += arr.join(",");
  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[create orderForm product error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[create orderForm product result]-----------------");
    console.log(result);

    cb(null, result);
  });
};

/*
 * 删除订单中的某产品
 * @param {obj} orderForm 订单模型
 * @param {function} cb 回调函数
 * */
dao.deleteByProduct = function(orderForm, cb) {
  var code = orderForm.getCode();
  var product = orderForm.getProduct();
  var sql = "DELETE FROM order_product WHERE code=? AND product=?";
  var inserts = [code, product];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[delete orderForm product by product error] - " +
        err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace(
      "[delete orderForm product by product result]---------------------"
    );
    console.log(result);

    cb(null, result);
  });
};

/*
 * 删除订单
 * @param {obj} orderForm 订单模型
 * @param {function} cb 回调函数
 * */
dao.deleteByOrder = function(orderForm, cb) {
  var code = orderForm.getCode();
  var sql = "DELETE FROM order_product WHERE code=?";
  var inserts = [code];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[delete orderForm product by orderForm error] - " +
        err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace(
      "[delete orderForm product by orderForm result]---------------------"
    );
    console.log(result);

    cb(null, result);
  });
};

/*
 * 更新订单产品数量
 * @param {obj} orderForm 订单模型
 * @param {function} cb 回调函数
 * */
dao.updateQuatity = function(orderForm, cb) {
  var code = orderForm.getCode();
  var product = orderForm.getProduct();
  var id = product.id;
  var quatity = product.quatity;
  var sql = "UPDATE order_product SET quatity=? WHERE code=? AND product=?";
  var inserts = [quatity, code, id];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[update orderForm product quatity error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace(
      "[update orderForm product quatity result]-------------------");
    console.log(result);

    cb(null, result);
  });
};

/*
 * 获取订单产品
 * @param {obj} orderForm 订单模型
 * @param {function} cb 回调函数
 * */
dao.getByOrder = function(orderForm, cb) {
  var code = orderForm.getCode();
  var sql =
    "SELECT product as id,book.name as name,quatity,book.price as price FROM order_product,book WHERE order_product.product=book.id AND code=?";
  var inserts = [code];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get orderForm product by order error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace(
      "[get orderForm product by order result]-------------------");
    console.log(result);

    cb(null, {
      list: result
    });
  });
};

exports.dao = dao;
