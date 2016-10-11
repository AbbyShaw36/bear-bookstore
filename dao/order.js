var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var uuid = require("../util/uuid").uuid;
var dao = {};

/*
 * 创建订单
 * @param {obj} orderForm 订单模型
 * @param {function} cb 回调函数
 * */
dao.create = function(orderForm, cb) {
  var code = uuid().replace(/-/g, "");
  var user = orderForm.getUser();
  var publishTime = new Date().getTime();
  var sql = "INSERT INTO orderForm(code,user,publishTime) VALUES(?,?,?)";
  var inserts = [code, user, publishTime];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[create orderForm error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[create orderForm result]------------------");
    console.log(result);

    cb(null, {
      code: code
    });
  });
};

/*
 * 删除表单
 * @param {obj} orderForm 订单模型
 * @param {function} cb 回调函数
 * */
dao.delete = function(orderForm, cb) {
  var code = orderForm.getCode();
  var sql = "DELETE FROM orderForm WHERE code=?";
  var inserts = [code];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[delete orderForm error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[delete orderForm result]--------------------");
    console.log(result);

    cb(null, {
      row: result.affectedRows
    });
  });
};

/*
 * 更新订单状态
 * @param {obj} orderForm 订单模型
 * @param {function} cb 回调函数
 * */
dao.update = function(orderForm, cb) {
  var code = orderForm.getCode();
  var status = orderForm.getStatus();
  var sql = "UPDATE orderForm SET status=? WHERE code=?";
  var inserts = [status, code];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[update orderForm status error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[update orderForm status result]--------------------");
    console.log(result);

    cb(null, {
      row: result.affectedRows
    });
  });
};

/*
 * 获取订单信息
 * @param {obj} orderForm 订单模型
 * @param {function} cb 回调函数
 * */
dao.get = function(orderForm, cb) {
  var code = orderForm.getCode();
  var sql =
    "SELECT code,user.id as user_id,user.name as user_name,publishTime,status FROM orderForm,user WHERE orderForm.user=user.id AND orderForm.code=?";
  var inserts = [code];

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get orderForm error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get orderForm result]-------------------------");
    console.log(result);

    cb(null, {
      orderForm: result[0]
    });
  });
};

/*
 * 获取订单列表
 * @param {obj} list 列表模型
 * @param {function} cb 回调函数
 * */
dao.getList = function(list, cb) {
  var orderForm = list.getContent();
  var code = orderForm.getCode();
  var user = orderForm.getUser();
  var publishTime = orderForm.getPublishTime();
  var status = orderForm.getStatus();
  var limit = list.getLimit();
  var offset = list.getOffset();
  var sortby = list.getSortby();
  var order = list.getOrder();
  var sql =
    "SELECT code,user.id as user_id,user.name as user_name,publishTime,status FROM orderForm,user WHERE orderForm.user=user.id";
  var inserts = [];

  if (code !== undefined) {
    sql += " AND code=?";
    inserts.push(code);
  }

  if (user !== undefined) {
    sql += " AND user.id=?";
    inserts.push(user);
  }

  if (publishTime !== undefined) {
    if (publishTime.max !== undefined) {
      sql += " AND publishTime<?";
      inserts.push(publishTime.max);
    }

    if (publishTime.min !== undefined) {
      sql += " AND publishTime>?";
      inserts.push(publishTime.min);
    }
  }

  if (status !== undefined) {
    sql += " AND status=?";
    inserts.push(status);
  }

  if (limit !== undefined) {
    sql += " LIMIT ?";
    inserts.push(limit);
  }

  if (offset !== undefined) {
    sql += " OFFSET ?";
    inserts.push(offset);
  }

  if (sortby !== undefined) {
    sql += " ORDER BY ?";
    inserts.push(sortby);
  }

  if (order !== undefined) {
    sql += " ?";
    inserts.push(order);
  }

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get orderForm list error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get orderForm list result]---------------------");
    console.log(result);

    cb(null, {
      list: result
    });
  });
};

dao.getListCount = function(list, cb) {
  var orderForm = list.getContent();
  var code = orderForm.getCode();
  var user = orderForm.getUser();
  var publishTime = orderForm.getPublishTime();
  var status = orderForm.getStatus();
  var sql =
    "SELECT count(*) FROM orderForm";
  var inserts = [];
  var arr = [];

  if (code !== undefined) {
    arr.pus("code=?");
    inserts.push(code);
  }

  if (user !== undefined) {
    arr.push("user.id=?");
    inserts.push(user);
  }

  if (publishTime !== undefined) {
    if (publishTime.max !== undefined) {
      arr.push("publishTime<?");
      inserts.push(publishTime.max);
    }

    if (publishTime.min !== undefined) {
      arr.push("publishTime>?");
      inserts.push(publishTime.min);
    }
  }

  if (status !== undefined) {
    arr.push("status=?");
    inserts.push(status);
  }

  if (arr.length > 0) {
    sql += " WHERE " + arr.join(" AND ");
  }

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get list count error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get list count result]-----------------");
    console.log(result);

    cb(null, {
      count: result[0]["count(*)"]
    });
  });
};

exports.dao = dao;
