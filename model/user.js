var User = function() {};
var fn = User.prototype;

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

/* password */
fn.setPassword = function(password) {
  this.password = password;
};

fn.getPassword = function() {
  return this.password;
};

exports.User = User;
