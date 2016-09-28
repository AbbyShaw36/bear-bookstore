var sha1 = require("sha1");
var sessionDao = require("../dao/session").dao;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var User = require("../model/user").User;
var service = {};
var admin = global.config.admin;

/* 登录 */
service.signin = function(user, cb) {
  var name = user.getName();
  var password = user.getPassword();

  if (name !== admin.name || password !== admin.password) {
    logger.warn("[admin signin error] - " + error.userNotExists.description);
    cb(error.userNotExists);
    return;
  }

  user.setId(admin.id);
  sessionDao.create(user, cb);
};

/* 退出 */
service.signout = function(user, cb) {
  sessionDao.delete(user, cb);
};

exports.service = service;
