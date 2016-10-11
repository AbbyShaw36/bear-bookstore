var OrderForm = require("../model/order").OrderForm;
var List = require("../model/list").List;
var service = require("../service/order").service;
var getQuery = require("../util/getQuery").getQuery;
var logger = require("../util/logger").logger;
var error = require("../util/error");

/*
 * 更新订单状态
 * 必须有订单号和状态
 * 创建对象后提交到service层执行
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.updateStatus = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var code = query.code;
    var status = query.status;
    var orderForm = null;

    // 判断是否有订单号
    if (!code) {
      logger.warn("[update order status error] - " + error.orderCodeNotProvided
        .description);
      cb(error.orderCodeNotProvided);
      return;
    }

    // 判断是否有状态
    if (!status) {
      logger.warn("[update order status error] - " + error.orderStatusNotProvided
        .description);
      cb(error.orderStatusNotProvided);
      return;
    }

    // 创建对象
    orderForm = new OrderForm();
    orderForm.setCode(code);
    orderForm.setStatus(status);

    // 提交到service层执行
    service.updateStatus(orderForm, cb);
  });
};

/*
 * 获取订单信息
 * 必须有订单号
 * 创建对象后提交到service层执行
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.get = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var code = query.code;
    var orderForm = null;

    // 判断是否有订单号
    if (!code) {
      logger.warn("[get order error] - " + error.orderCodeNotProvided.description);
      cb(error.orderCodeNotProvided);
      return;
    }

    // 创建对象
    orderForm = new OrderForm();
    orderForm.setCode(code);

    // 提交到service层执行
    service.get(orderForm, cb);
  });
};

/*
 * 获取订单列表
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.getList = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var code = query.code;
    var user = query.user;
    var publishTime = query.publishTime;
    var status = query.status;
    var limit = query.limit;
    var offset = query.offset;
    var sortby = query.sortby;
    var order = query.order;
    var orderForm = new OrderForm();
    var list = new List();

    // 创建对象
    orderForm.setCode(code);
    orderForm.setUser(user);
    orderForm.setPublishTime(publishTime);
    orderForm.setStatus(status);
    list.setContent(orderForm);
    list.setLimit(limit);
    list.setOffset(offset);
    list.setSortby(sortby);
    list.setOrder(order);

    // 提交给service层执行
    service.getList(list, cb);
  });
};
