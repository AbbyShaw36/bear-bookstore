var Order = function() {};
var fn = Order.prototype;

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

exports.Order = Order;
