var cookie = require("cookie");
var User = require("../model/user").User;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var getQuery = require("../util/getQuery").getQuery;
var service = require("../service/user").service;

/*
 * 注册
 * 必须有名称和密码
 * 创建对象后提交到service层执行
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.signup = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var name = query.name;
    var password = query.password;
    var user = null;

    // 判断是否有名称
    if (!name) {
      logger.warn("[user signup error] - " + error.usernameNotProvided.description);
      cb(error.usernameNotProvided);
      return;
    }

    // 判断是否有密码
    if (!password) {
      logger.warn("[user signup error] - " + error.passwordNotProvided.description);
      cb(error.passwordNotProvided);
      return;
    }

    // 创建用户对象
    user = new User();
    user.setName(name);
    user.setPassword(password);

    // 提交到service层执行
    service.signup(user, cb);
  });
};

/*
 * 登录
 * 必须有名称和密码
 * 提交到service层执行，返回sessionId
 * 将sessionId保存cookie
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
      logger.warn("[user signup error] - " + error.usernameNotProvided.description);
      cb(error.usernameNotProvided);
      return;
    }

    // 判断是否有密码
    if (!password) {
      logger.warn("[user signup error] - " + error.passwordNotProvided.description);
      cb(error.passwordNotProvided);
      return;
    }

    // 创建对象
    user = new User();
    user.setName(name);
    user.setPassword(password);

    // 提交到service层执行
    service.signin(user, function(err, result) {
      var sessionId = null;
      var date = null;
      var expireDays = 1;
      var newCookie = "";

      if (err) {
        cb(err);
        return;
      }

      // 获得sessionId，保存cookie
      sessionId = result.sessionId;
      date = new Date();
      date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000);

      newCookie = cookie.serialize("sessionId", sessionId, {
        path: "/",
        expires: date.toGMTString(),
        secure: true,
        httpOnly: true
      });
      res.append("Set-Cookie", newCookie);

      // 返回空对象
      cb(null, {});
    });
  });
};

/*
 * 退出登录
 * 获取sessionId，提交到service层执行
 * 成功后删除cookie
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.signout = function(req, res, cb) {
  // 从cookie获取对应的sessionId，并创建用户对象
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

    // 执行成功删除原先cookie
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
