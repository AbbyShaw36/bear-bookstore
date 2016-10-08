var logger = require("../util/logger").logger;
var error = require("../util/error");
var getQuery = require("../util/getQuery").getQuery;
var Book = require("../model/book").Book;
var service = require("../service/book").service;

/*
 * 新增书籍
 * 必须有名称和价格
 * 获取提交的数据后，打包成对象，交由service层执行
 * 返回执行后结果
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.create = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var name = query.name;
    var types = query.types;
    var authors = query.authors;
    var stock = query.stock;
    var price = query.price;
    var description = query.description;
    var book = null;

    // 判断是否有名称
    if (!name) {
      logger.warn("[create book error] - " + error.bookNameNotProvided.description);
      cb(error.bookNameNotProvided);
      return;
    }

    // 判断是否有价格
    if (!price) {
      logger.warn("[create book error] - " + error.bookPriceNotProvided
        .description);
      cb(error.bookPriceNotProvided);
      return;
    }

    // 创建书籍对象
    book = new Book();
    book.setName(name);
    book.setType(types);
    book.setAuthor(authors);
    book.setStock(stock);
    book.setPrice(price);
    book.setDescription(description);

    // service层执行
    service.create(book, cb);
  });
};

/*
 * 获取书籍
 * 必须提供书籍id
 * 创建书籍对象后，提交到service层执行
 * 返回执行结果
 * */
exports.get = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var id = query.id;
    var book = null;

    // 判断是否有id
    if (!id) {
      logger.warn("[get book error] - " + error.bookIdNotProvided.description);
      cb(error.bookIdNotProvided);
      return;
    }

    // 创建书籍对象
    book = new Book();
    book.setId(id);

    // service层执行
    service.get(book, cb);
  });
};

/*
 * 更新书籍信息
 * 必须有书籍id、名称、价格
 * 将创建的书籍对象提交给service层执行
 * 返回执行结果
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.update = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var id = query.id;
    var name = query.name;
    var types = query.types;
    var authors = query.authors;
    var stock = query.stock;
    var price = query.price;
    var description = query.description;
    var book = null;

    // 判断是否有id
    if (!id) {
      logger.warn("[update book error] - " + error.bookIdNotProvided.description);
      cb(error.bookIdNotProvided);
      return;
    }

    // 判断是否有名称
    if (!name) {
      logger.warn("[update book error] - " + error.bookNameNotProvided.description);
      cb(error.bookNameNotProvided);
      return;
    }

    // 判断是否有价格
    if (!price) {
      logger.warn("[update book error] - " + error.bookPriceNotProvided
        .description);
      cb(error.bookPriceNotProvided);
      return;
    }

    // 创建书籍对象
    book = new Book();
    book.setId(id);
    book.setName(name);
    book.setType(types);
    book.setAuthor(authors);
    book.setStock(stock);
    book.setPrice(price);
    book.setDescription(description);

    // 提交到service层执行
    service.update(book, cb);
  });
};

/*
 * 删除书籍
 * 必须有书籍id
 * 创建书籍对象后提交给service层执行
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.delete = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var id = query.id;
    var book = null;

    // 判断是否有id
    if (!id) {
      logger.warn("[delete book error] - " + error.bookIdNotProvided.description);
      cb(error.bookIdNotProvided);
      return;
    }

    // 创建书籍对象
    book = new Book();
    book.setId(id);

    // 提交service层执行
    service.delete(book, cb);
  });
};

/*
 * 更新书籍库存
 * 必须有书籍id、库存
 * 创建书籍对象后，提交给service层执行
 * @param {obj} req request
 * @param {obj} res response
 * @param {function} cb 回调函数
 * */
exports.updateStock = function(req, res, cb) {
  // 获取提交数据
  getQuery(req, function(query) {
    var id = query.id;
    var stock = query.stock;
    var book = null;

    // 判断是否有id
    if (!id) {
      logger.warn("[update book stock error] - " + error.bookIdNotProvided
        .description);
      cb(error.bookIdNotProvided);
      return;
    }

    // 判断是否有库存
    if (!stock) {
      logger.warn("[update book stock error] - " + error.bookStockNotProvided
        .description);
      cb(error.bookStockNotProvided);
      return;
    }

    // 创建书籍对象
    book = new Book();
    book.setId(id);
    book.setStock(stock);

    // 提交service层执行
    service.updateStock(book, cb);
  });
};
