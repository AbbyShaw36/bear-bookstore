var url = require("url");
var cookie = require("cookie");
var logger = require("../util/logger").logger;
var error = require("../util/error");
var statusCode = require("../util/statusCode");
var sessionDao = require("../dao/session").dao;
var userDao = require("../dao/user").dao;
var User = require("../model/user").User;

var responses = {
  unauthorized: function(res, pathname) {
    logger.warn("User request for " + pathname + " is unauthorized.");
    res.statusCode = statusCode.unauthorized;
    res.statusMessage = error.unauthorized.message;
    res.end();
  },
  error: function(res, err) {
    res.statusCode = statusCode[err.type];
    res.statusMessage = err.description;
    res.end();
  },
  success: function(res, result) {
    res.statusCode = statusCode.success;

    if (typeof result === "string") {
      res.setHeader("Content-Type", "html");
      res.write(result);
      res.end();
      return;
    }

    res.end(JSON.stringify(result));
  },
  redirect: function(res, pathname) {
    res.writeHead(302, {
      "Location": pathname
    });
    res.end();
  }
};

var notMustSigned = [];

// 执行操作
function dofn(req, res, fn) {
  fn(req, res, function(err, result) {
    if (err) {
      responses.error(res, err);
      return;
    }

    responses.success(res, result);
  });
}

/*
 * 检查是否已登录
 * @param {obj} req 请求
 * @param {obj} res 响应
 * @param {function} cb 回调函数
 * */
function checkSignedIn(req, res, cb) {
  var cookies = cookie.parse(req.headers.cookie || "");
  var sessionId = cookies.sessionId;
  var pathname = url.parse(req.url).pathname;
  var user = null;

  // 没有cookie为sessionId，未登录
  if (!sessionId) {
    logger.trace("SessionId is not provided.");
    cb(false);
    return;
  }

  // 创建user对象
  user = new User();
  user.setSessionId(sessionId);

  // 获取sessionId对应userId
  sessionDao.get(user, function(err, result) {
    var id = null;

    if (err) {
      responses.error(res, err);
      return;
    }

    logger.trace("Get session user success.");
    id = result.user;

    // session不存在，未登录
    if (id === undefined) {
      logger.trace("SessionId is not exists.")
      cb(false);
      return;
    }

    // 后台操作,判断结束
    if (pathname.indexOf("/admin/") !== -1) {
      // 用户为高级管理员，已登录
      if (id === global.config.admin.id) {
        logger.trace("The user is admin.");
        cb(true);
        return;
      }

      logger.tace("The user has not signned in.");
      cb(false);
      return;
    }

    user.setId(id);

    // 获取userId对应user
    userDao.get(user, function(err, result) {
      if (err) {
        responses.error(res, err);
        return;
      }

      // 用户不存在，即未登录
      if (result.count === 0) {
        logger.tace("The user signin is not exists.");
        cb(false);
        return;
      }

      // 所有判断项都通过，已登录
      logger.trace("The user has signed in");
      cb(true);
    }, true);
  });
}

exports.middleware = function(req, res, fn) {
  var pathname = url.parse(req.url).pathname;

  if (pathname in notMustSigned) {
    dofn(req, res, fn);
  }

  checkSignedIn(req, res, function(isSignedIn) {
    // 后台登录操作
    if (pathname === "/api/admin/sign" && req.method === "POST") {
      if (isSignedIn) {
        responses.success(res, {});
        return;
      }

      dofn(req, res, fn);
      return;
    }

    // 后台登录页面
    if (pathname === "/admin/sign" && req.method === "GET") {
      if (isSignedIn) {
        responses.redirect(res, "/admin/index");
        return;
      }

      dofn(req, res, fn);
      return;
    }

    // 前台登录操作
    if (pathname === "/api/sign" && req.method === "POST") {
      if (isSignedIn) {
        responses.success(res, {});
        return;
      }

      dofn(req, res, fn);
      return;
    }

    // 操作请求
    if (pathname.indexOf("/api/") !== -1) {
      if (!isSignedIn) {
        responses.unauthorized(req, pathname);
        return;
      }

      dofn(req, res, fn);
      return;
    }


    // 后台请求页面
    if (pathname.indexOf("/admin/") !== -1) {
      if (!isSignedIn) {
        responses.redirect(res, "/admin/sign");
        return;
      }

      dofn(req, res, fn);
      return;
    }

    // 前台请求页面
    if (!isSignedIn) {
      responses.redirect(res, "/admin/sign/not");
      return;
    }

    dofn(req, res, fn);
    return;
  });
};
