var authorDao = require("../dao/author").dao;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var service = {};

/*
 * 新增作者
 * @param {obj} author 作者对象
 * @param {function} cb 回调函数
 * */
service.create = function(author, cb) {
  authorDao.create(author, cb);
};

/*
 * 更新作者名称
 * @param {obj} author 作者对象
 * @param {function} cb 回调函数
 * */
service.update = function(author, cb) {
  authorDao.update(author, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.row === 0) {
      logger.warn("[update author error] - " + error.authorNotExists.description);
      cb(error.authorNotExists);
      return;
    }

    cb(null, {});
  });
};

/*
 * 获取作者列表
 * @param {obj} list 列表对象
 * @param {function} cb 回调函数
 * */
service.getList = function(list, cb) {
  authorDao.getList(list, cb);
};

exports.service = service;
