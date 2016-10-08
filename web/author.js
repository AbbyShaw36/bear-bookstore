var getQuery = require("../util/getQuery").getQuery;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var Author = require("../model/author").Author;
var List = require("../model/list").List;
var service = require("../service/author").service;

/*
 * 新增作者
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
    var author = null;

    // 判断是否有名称
    if (!name) {
      logger.warn("[create author error] - " + error.authorNameNotProvided
        .description);
      cb(error.authorNameNotProvided);
      return;
    }

    // 创建对象
    author = new Author();
    author.setName(name);

    // 提交到service层执行
    service.create(author, cb);
  });
};

/*
 * 更新作者信息
 * 必须有作者id、名称
 * 创建对象后提交到service层执行
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.update = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var id = query.id;
    var name = query.name;
    var author = null;

    // 判断是否有id
    if (!id) {
      logger.warn("[update author error] - " + error.authorIdNotProvided
        .description);
      cb(error.authorIdNotProvided);
      return;
    }

    // 判断是否有名称
    if (!name) {
      logger.warn("[update author error] - " + error.authorNameNotProvided
        .description);
      cb(error.authorNameNotProvided);
      return;
    }

    // 创建对象
    author = new Author();
    author.setId(id);
    author.setName(name);

    // 提交到service层执行
    service.update(author, cb);
  });
};

/*
 * 获取作者列表
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.getList = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var limit = query.limit;
    var offset = query.offset;
    var sortby = query.sortby;
    var order = query.order;
    var list = new List();

    // 创建对象
    list.setLimit(limit);
    list.setOffset(offset);
    list.setSortby(sortby);
    list.setOrder(order);

    // 提交到service层执行
    service.getList(list, cb);
  });
};
