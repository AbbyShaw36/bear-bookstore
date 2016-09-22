var userDao = require("../dao/user").dao;
var sessionDao = require("../dao/session").dao;
var error = require("../util/error");
var logger = require("../util/logger").logger;
var service = {};

/*
 * 注册
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * 返回值：用户id
 * */
service.signup = function(user, cb) {
  userDao.isUnique(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (!result) {
      logger.warn("[user signup error] - " + error.usernameAlreadyExists
        .description);
      cb(error.usernameAlreadyExists);
      return;
    }

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
