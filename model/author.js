var Author = function() {};
var fn = Author.prototype;

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

exports.Author = Author;
