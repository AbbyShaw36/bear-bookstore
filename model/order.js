var OrderForm = function() {};
var fn = OrderForm.prototype;

/* code */
fn.setCode = function(code) {
  this.code = code;
};

fn.getCode = function() {
  return this.code;
};

/* book */
fn.setProduct = function(product) {
  this.product = product;
};

fn.getProduct = function() {
  return this.product;
};

/* user */
fn.setUser = function(user) {
  this.user = user;
};

fn.getUser = function() {
  return this.user;
};

/* publishTime */
fn.setPublishTime = function(publishTime) {
  this.publishTime = publishTime;
};

fn.getPublishTime = function() {
  return this.publishTime;
};

/* status */
fn.setStatus = function(status) {
  this.status = status;
};

fn.getStatus = function() {
  return this.status;
};

exports.OrderForm = OrderForm;
