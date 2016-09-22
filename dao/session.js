var Session = require("./model").Session;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var dao = {};

/*
 * 创建session
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * */
dao.create = function(user, cb) {
  var userId = user.getId();
  var session = new Session({
    userId: userId
  });

  session.save(function(err, result) {
    if (err) {
      logger.error("[create session error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[create session result]---------------------- ");
    console.log(result);

    cb(null, {
      sessionId: result._id
    });
  });
};

/*
 * 获取session
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * */
dao.get = function(user, cb) {
  var sessionId = user.getSessionId();

  Session.find({
    _id: sessionId
  }, function(err, result) {
    if (err) {
      logger.error("[get session error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[get session result]------------------------");
    console.log(result);

    cb(null, {
      user: result[0].userId
    });
  });
};

/*
 * 删除session
 * @param {obj} user 用户模型
 * @param {function} cb 回调函数
 * */
dao.delete = function(user, cb) {
  var sessionId = user.getSessionId();

  Session.remove({
    _id: sessionId
  }, function(err, result) {
    if (err) {
      logger.error("[delete session error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    logger.trace("[delete session result]-----------------------");
    console.log(result);

    cb(null, {
      row: result.result.n
    });
  });
};

exports.dao = dao;
