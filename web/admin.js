var cookie = require("cookie");
var User = require("../model/user").User;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var getQuery = require("../util/getQuery").getQuery;
var User = require("../model/user").User;
var service = require("../service/admin").service;

/*
 * 登录
 * 必须有名称和密码
 * 创建对象后提交到service层执行
 * 执行成功,获得sessionId，创建cookie
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.signin = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var name = query.name;
    var password = query.password;
    var user = null;

    // 判断是否有名称
    if (!name) {
      logger.warn("[admin signin error] - " + error.usernameNotProvided
        .description);
      cb(error.usernameNotProvided);
      return;
    }

    // 判断是否有密码
    if (!password) {
      logger.warn("[admin signin error] - " + error.passwordNotProvided
        .description);
      cb(error.passwordNotProvided);
      return;
    }

    // 创建对象
    user = new User();
    user.setName(name);
    user.setPassword(password);

    // 提交到service层执行
    service.signin(user, function(err, result) {
      const expireDays = 1;
      var sessionId = null;
      var time = null;
      var newCookie = "";

      if (err) {
        cb(err);
        return;
      }

      // 执行成功，获得相应sessionId
      sessionId = result.sessionId;
      time = 60 * 60 * 24 * expireDays;

      // 创建cookie
      newCookie = cookie.serialize("sessionId", sessionId, {
        path: "/admin/",
        httpOnly: true,
        maxAge: time
      });
      res.setHeader("Set-Cookie", newCookie);

      // 返回空对象
      cb(null, {});
    });
  });
};

/*
 * 退出
 * 从cookie中获取sessionId
 * 提交到service层执行
 * 删除原先cookie
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.signout = function(req, res, cb) {
  // 获取sessionId并创建用户对象
  var sessionId = cookie.parse(req.headers.cookie || "").sessionId;
  var user = new User();

  user.setSessionId(sessionId);

  // 提交到service层执行
  service.signout(user, function(err, result) {
    var newCookie = "";

    if (err) {
      cb(err);
      return;
    }

    // 将原先cookie删除
    newCookie = cookie.serialize("sessionId", "", {
      path: "/",
      maxAge: 0,
      secure: true,
      httpOnly: true
    });
    res.append("Set-Cookie", newCookie);

    // 返回空对象
    cb(null, {});
  });
};
