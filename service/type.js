var typeDao = require("../dao/type").dao;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var service = {};

/*
 * 创建类型
 * @param {obj} type 类型对象
 * @param {function} cb 回调函数
 * */
service.create = function(type, cb) {
  typeDao.create(type, cb);
};

/*
 * 更新类型
 * @param {obj} type 类型对象
 * @param {function} cb 回调函数
 * */
service.update = function(type, cb) {
  // 提交到dao层执行
  typeDao.update(type, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    // 判断是否有更新类型行数
    if (result.row === 0) {
      logger.warn("[update type error] - " + error.typeNotExists.description);
      cb(error.typeNotExists);
      return;
    }

    // 回调返回空对象
    cb(null, {});
  });
};

/*
 * 获取类型列表
 * @param {obj} list 列表对象
 * @param {function} cb 回调函数
 * */
service.getList = function(list, cb) {
  typeDao.getList(list, cb);
};

exports.service = service;
