var cookie = require("cookie");
var User = require("../model/user").User;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var getQuery = require("../util/getQuery").getQuery;
var User = require("../model/user").User;
var service = require("../service/admin").service;

// 登录
exports.signin = function(req, res, cb) {
  getQuery(req, function(query) {
    var name = query.name;
    var password = query.password;
    var user = null;

    if (!name) {
      logger.warn("[admin signin error] - " + error.usernameNotProvided
        .description);
      cb(error.usernameNotProvided);
      return;
    }

    if (!password) {
      logger.warn("[admin signin error] - " + error.passwordNotProvided
        .description);
      cb(error.passwordNotProvided);
      return;
    }

    user = new User();
    user.setName(name);
    user.setPassword(password);

    service.signin(user, function(err, result) {
      var sessionId = null;
      var date = null;
      var expireDays = 1;
      var newCookie = "";

      if (err) {
        cb(err);
        return;
      }

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
      cb(null, {});
    });
  });
};

// 退出
exports.signout = function(req, res, cb) {
  var sessionId = cookie.parse(req.headers.cookie || "").sessionId;
  var user = new User();

  user.setSessionId(sessionId);

  service.signout(user, function(err, result) {
    var newCookie = "";

    if (err) {
      cb(err);
      return;
    }

    newCookie = cookie.serialize("sessionId", "", {
      path: "/",
      maxAge: 0,
      secure: true,
      httpOnly: true
    });
    res.append("Set-Cookie", newCookie);
    cb(null, {});
  });
};
