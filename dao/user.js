var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var dao = {};

/*
 * 创建用户
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * 返回值：用户id
 * */
dao.create = function(user, cb) {
  var name = user.getName();
  var password = user.getPassword();
  var sql = "INSERT INTO user(name,password) VALUES(?,?)";
  var inserts = [name, password];

  sql = mysql.format(sql, inserts);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[create user error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[create user result]--------------------------");
    console.log(result);
    logger.trace("----------------------------------------------");

    result = {
      id: result.insertId
    };

    cb(null, result);
  });
};

/*
 * 获取用户
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * @param {boolean} isGetCount 是否获取用户数量
 * 返回值：
 * 如果是获取用户数量，返回数量值count
 * 只是获取用户信息，返回用户数据（包括id和name）
 * */
dao.get = function(user, cb, isGetCount) {
  var id = user.getId();
  var name = user.getName();
  var password = user.getPassword();
  var sql = isGetCount ? "SELECT count(*) FROM user " :
    "SELECT id,name FROM user ";
  var inserts = [];
  var qualification = [];

  if (id) {
    qualification.push("id=?");
    inserts.push(id);
  }

  if (name) {
    qualification.push("name=?");
    inserts.push(name);
  }

  if (password) {
    qualification.push("password=?");
    inserts.push(password);
  }

  if (qualification.length > 0) {
    sql += "WHERE " + qualification.join(" AND ");
  }

  sql = mysql.format(sql, inserts);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get user error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get user result]--------------------------");
    console.log(result);

    if (isGetCount) {
      result = {
        count: result[0]["count(*)"]
      };
    } else {
      result = {
        user: result[0]
      };
    }

    cb(null, result);
  });
};

/*
 * 获取用户列表
 * @param {obj} list 列表模型
 * @param {function} cb 回调函数
 * 返回值：用户列表数组list
 * */
dao.getList = function(list, cb) {
  var limit = list.getLimit();
  var offset = list.getOffset();
  var sortby = list.getSortby();
  var order = list.getOrder();
  var sql = "SELECT id,name FROM user";
  var inserts = [];

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
      logger.error("[get user list error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get user list result]--------------------------");
    console.log(result);

    result = {
      list: result
    };

    cb(null, result);
  });
};

/*
 * 更新用户信息
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * 返回值：更新行数row
 * */
dao.update = function(user, cb) {
  var id = user.getId();
  var name = user.getName();
  var password = user.getPassword();
  var sql = "UPDATE user SET ";
  var inserts = [];
  var values = [];

  if (name) {
    values.push("name=?");
    inserts.push(name);
  }

  if (password) {
    values.push("password=?");
    inserts.push(password);
  }

  sql += values.join(",") + " WHERE id=?";
  inserts.push(id);
  sql = mysql.format(sql, inserts);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[update user error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[update user result]--------------------------");
    console.log(result);

    result = {
      row: result.affectedRows
    };

    cb(null, result);
  });
};

/*
 * 检查用户名是否唯一
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * 返回值：
 * 如果是唯一值返回true，否则返回false
 * */
dao.isUnique = function(user, cb) {
  var id = user.getId();
  var name = user.getName();
  var sql = "SELECT count(*) FROM user WHERE name=?";
  var inserts = [name];

  if (id) {
    sql += " AND id!=?";
    inserts.push(id);
  }

  sql = mysql.format(sql, inserts);
  console.log(sql);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[check user name unique error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace(
      "[check user name unique result]--------------------------");
    console.log(result);

    if (result[0]["count(*)"] > 0) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  });
};

exports.dao = dao;
