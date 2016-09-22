var List = function() {};
var fn = List.prototype;

/* content */
fn.setContent = function(content) {
  this.content = content;
};

fn.getContent = function() {
  return this.content;
};

/* limit */
fn.setLimit = function(limit) {
  this.limit = Number(limit);
};

fn.getLimit = function() {
  return this.limit;
};

/* offset */
fn.setOffset = function(offset) {
  this.offset = Number(offset);
};

fn.getOffset = function() {
  return this.offset;
};

/* sortby */
fn.setSortby = function(sortby) {
  this.sortby = sortby;
};

fn.getSortby = function() {
  return this.sortby;
};

/* order */
fn.setOrder = function(order) {
  this.order = order;
};

fn.getOrder = function() {
  return this.order;
};

exports.List = List;
