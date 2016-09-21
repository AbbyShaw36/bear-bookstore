var Order = function() {};
var fn = Order.prototype;

/* id */
fn.setId = function(id) {
  this.id = id;
};

fn.getId = function() {
  return this.id;
};

/* book */
fn.setProducts = function(products) {
  this.products = products;
};

fn.getProducts = function() {
  return this.products;
};

/* user */
fn.setUser = function(user) {
  this.user = user;
};

fn.getUser = function() {
  return this.user;
};

/*  */

exports.Order = Order;
