var sha1 = require("sha1");
var User = function() {};
var fn = User.prototype;

/* id */
fn.setId = function(id) {
  this.id = Number(id);
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
  this.password = sha1(password);
};

fn.getPassword = function() {
  return this.password;
};

/* sessionId */
fn.setSessionId = function(sessionId) {
  this.sessionId = sessionId;
};

fn.getSessionId = function() {
  return this.sessionId;
};

exports.User = User;
