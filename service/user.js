var userDao = require("../dao/user").dao;
var sessionDao = require("../dao/session").dao;
var error = require("../util/error");
var logger = require("../util/logger").logger;
var service = {};

/*
 * 注册
 * 先判断用户是否唯一，再创建用户
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * 返回值：用户id
 * */
service.signup = function(user, cb) {
  // 提交到dao层执行，判断用户名是否唯一
  userDao.isUnique(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    // 判断不是唯一值
    if (!result) {
      logger.warn("[user signup error] - " + error.usernameAlreadyExists
        .description);
      cb(error.usernameAlreadyExists);
      return;
    }

    // 是唯一值，创建用户
    userDao.create(user, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      logger.trace("[user signup success] - user id is " + result.id);
      cb(null, result);
    });
  });
};

/*
 * 登录
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * 返回值：sessionId
 * */
service.signin = function(user, cb) {
  // 通过名称和密码查找用户id
  userDao.get(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.user) {
      logger.warn("[user signin error] - " + error.userNotExists.description);
      cb(error.userNotExists);
      return;
    }

    var id = result.user.id;
    user.setId(id);

    // 获得用户id，创建session
    sessionDao.create(user, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      logger.trace("[user signin success] - user sessionId is " +
        result
        .sessionId);
      cb(null, result);
    });
  });
};

/*
 * 退出
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * */
service.signout = function(user, cb) {
  // 删除session
  sessionDao.delete(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    logger.trace("[user signout success] - delete session " + result.row +
      " rows");
    cb(null);
  });
};

/*
 * 获取用户信息
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * */
service.get = function(user, cb) {
  userDao.get(user, cb);
};

exports.service = service;
