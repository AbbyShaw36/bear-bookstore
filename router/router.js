var url = require("url");
var middleware = require("../middleware/middleware").middleware;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var serveStatic = require("../util/serveStatic").serveStatic;
var statusCode = require("../util/statusCode");
var handle = require("./handle").handle;

exports.router = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var fn = null;

  logger.trace("About to route a request for " + pathname);

  // 请求静态页面
  if (typeof handle[pathname] !== "function") {
    logger.trace("The request for " + pathname + " is a static serve.");
    serveStatic(req, res);
    return;
  }

  fn = handle[pathname][req.method];

  // 请求方式错误
  if (typeof fn !== "function") {
    logger.warn("The method of request for " + pathname +
      " is not allowed.");
    res.statusCode = statusCode.methodNotAllowed;
    res.statusMessage = error.methodNotAllowed.discription;
    res.end();
    return;
  }

  middleware(req, res, fn);
};
