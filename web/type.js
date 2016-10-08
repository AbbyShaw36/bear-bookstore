var getQuery = require("../util/getQuery").getQuery;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var Type = require("../model/type").Type;
var List = require("../model/list").List;
var service = require("../service/type").service;

/*
 * 创建类型
 * 必须有名称
 * 创建对象后提交到service层执行
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.create = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var name = query.name;
    var type = null;

    // 判断是否有名称
    if (!name) {
      logger.warn("[create type error] - " + error.typeNameNotProvided.description);
      cb(error.typeNameNotProvided);
      return;
    }

    // 创建对象
    type = new Type();
    type.setName(name);

    // 提交到service层执行
    service.create(type, cb);
  });
};

/*
 * 更新类型
 * 必须有类型id、名称
 * 创建对象后提交到service层执行
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.update = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var name = query.name;
    var id = query.id;
    var type = null;

    // 判断是否有id
    if (!id) {
      logger.warn("[update type error] - " + error.typeIdNotProvided.description);
      cb(error.typeIdNotProvided);
      return;
    }

    // 判断是否有名称
    if (!name) {
      logger.warn("[update type error] - " + error.typeNameNotProvided.description);
      cb(error.typeNameNotProvided);
      return;
    }

    // 创建对象
    type = new Type();
    type.setId(id);
    type.setName(name);

    // 提交到service层执行
    service.update(type, cb);
  });
};

exports.getList = function(req, res, cb) {
  getQuery(req, function(query) {
    var limit = query.limit;
    var offset = query.offset;
    var sortby = query.sortby;
    var order = query.order;
    var list = new List();

    list.setLimit(limit);
    list.setOffset(offset);
    list.setSortby(sortby);
    list.setOrder(order);

    service.getList(list, cb);
  });
};
