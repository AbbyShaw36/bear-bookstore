var Book = function() {};
var fn = Book.prototype;

/* id */
fn.setId = function(id) {
  this.id = id;
};

fn.getId = function() {
  return this.id;
};

/* name */
fn.setName = function(name) {
  this.name = name;
};

fn.getName = function() {
  return this.name;
};

/* type */
fn.setType = function(type) {
  this.type = type;
};

fn.getType = function() {
  return this.type;
};

/* author */
fn.setAuthor = function(author) {
  this.author = author;
};

fn.getAuthor = function() {
  return this.author;
};

/* price */
fn.setPrice = function(price) {
  this.price = price;
};

fn.getPrice = function() {
  return this.price;
};

/* stock */
fn.setStock = function(stock) {
  this.stock = stock;
};

fn.getStock = function() {
  return this.stock;
};

/* description */
fn.setDescription = function(description) {
  this.description = description;
};

fn.getDescription = function() {
  return this.description;
};

/* quatity */
fn.setQuatity = function(quatity) {
  this.quatity = quatity;
};

fn.getQuatity = function() {
  return this.quatity;
};

exports.Book = Book;
