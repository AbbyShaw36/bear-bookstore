var logger = require("../util/logger").logger;
var error = require("../util/error");
var orderDao = require("../dao/order").dao;
var orderProductDao = require("../dao/order_product").dao;
var service = {};

/*
 * 更新订单状态
 * @param {obj} orderForm 订单对象
 * @param {function} cb 回调函数
 * */
service.updateStatus = function(orderForm, cb) {
  // 提交到dao层执行
  orderDao.update(orderForm, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    // 判断是否有执行行数
    if (result.row === 0) {
      logger.warn("[update order status error] - " + error.orderNotExists
        .description);
      cb(error.orderNotExists);
      return;
    }

    // 成功返回空对象
    cb(null, {});
  });
};

/*
 * 获取订单信息
 * 先获取订单基本信息，确保订单存在后，获取订单产品信息
 * 返回订单信息对象
 * @param {obj} orderForm 订单对象
 * @param {function} cb 回调函数
 * */
service.get = function(orderForm, cb) {
  // 提交到dao层执行，获取基本信息
  orderDao.get(orderForm, function(err, result) {
    var order = null;

    if (err) {
      cb(err);
      return;
    }

    order = result.orderForm;

    // 判断是否存在该订单
    if (!order) {
      logger.warn("[get order error] - " + error.orderNotExists.description);
      cb(error.orderNotExists);
      return;
    }

    // 提交到dao层执行，获取订单产品信息
    orderProductDao.getByOrder(orderForm, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      // 将获取结果打包成对象返回
      order.product = result.list;
      cb(null, {
        order: order
      });
    });
  });
};

/*
 * 获取订单列表
 * 先获取总数，再获取需要返回的行，两者打包成对象返回
 * @param {obj} list 列表模型
 * @param {function} cb 回调函数
 * */
service.getList = function(list, cb) {
  // 获取总数
  orderDao.getListCount(list, function(err, result) {
    var count = null;

    if (err) {
      cb(err);
      return;
    }

    count = result.count;

    // 判断是否总数为0
    if (count === 0) {
      // 直接返回空列表数组和总数
      cb(null, {
        list: [],
        count: count
      });
      return;
    }

    // 获取请求的行
    orderDao.getList(list, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      // 返回相应列表数组和总数
      cb(null, {
        list: result.list,
        count: count
      });
    });
  });
};

exports.service = service;
