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
    res.redirect(pathname);
    res.end();
  }
};

var mustSigned = [];

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
 * @param {function} fn 执行操作
 * @param {boolean} isSign 是否为登录操作或获取登录页面
 * @param {boolean} isAdmin 是否为后台操作
 * */
function api_checkSignedIn(req, res, fn, isSign, isAdmin) {
  var cookies = cookie.parse(req.headers.cookie || "");
  var sessionId = cookies.sessionId;
  var pathname = url.parse(req.url).pathname;
  var user = null;

  // 没有cookie为sessionId，未登录
  if (!sessionId) {
    if (isSign) {
      dofn(req, res, fn);
      return;
    }

    responses.unauthorized(res, pathname);
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
    if (!id) {
      if (isSign) {
        dofn(req, res, fn);
        return;
      }

      responses.unauthorized(res, pathname);
      return;
    }

    // 后台操作,判断结束
    if (isAdmin) {
      // 用户为高级管理员，已登录
      if (id === global.config.admin.id) {
        logger.trace("The user is admin.");

        if (isSign) {
          responses.success(res, {});
          return;
        }

        dofn(req, res, fn);
        return;
      }

      if (isSign) {
        dofn(req, res, fn);
        return;
      }

      responses.unauthorized(res, pathname);
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
        if (isSign) {
          dofn(req, res, fn);
          return;
        }

        responses.unauthorized(res, pathname);
        return;
      }

      // 所有判断项都通过，已登录
      if (isSign) {
        responses.success(res, {});
        return;
      }

      dofn(req, res, fn);
    }, true);
  });
}

exports.api_middleware = function(req, res, fn) {
  var pathname = url.parse(req.url).pathname;

  // 后台操作
  if (pathname.indexOf("/admin/") !== -1) {
    // 登录操作
    if (pathname === "/api/admin/sign" && req.method === "POST") {
      checkSignedIn(req, res, fn, true, true);
      return;
    }

    checkSignedIn(req, res, fn, false, true);
    return;
  }

  // 前台操作
  if (mustSigned.indexOf(pathname) !== -1) {
    // 登录操作
    if (pathname === "/api/user/sign" && req.method === "POST") {
      checkSignedIn(req, res, fn, true);
      return;
    }

    checkSignedIn(req, res, fn);
    return;
  }

  dofn(req, res, fn);
};

exports.page_middlewar = function(req, res, fn) {};
