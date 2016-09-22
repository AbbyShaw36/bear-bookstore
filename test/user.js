var User = require("../model/user").User;
var List = require("../model/list").List;
var dao = require("../dao/user").dao;
var service = require("../service/user").service;

function dao_create() {
  var name = "abc";
  var password = "123456";
  var user = new User();

  user.setName(name);
  user.setPassword(password);

  dao.create(user, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

function dao_get() {
  var name = "abc";
  var user = new User();

  user.setName(name);

  dao.get(user, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

function dao_getList() {
  var list = new List();

  dao.getList(list, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

function dao_update() {
  var user = new User();

  user.setId(2);
  user.setName("aaa");

  dao.update(user, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

function dao_isUnique() {
  var user = new User();

  user.setId(2);
  user.setName("aaa");

  dao.isUnique(user, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

function service_signup() {
  var user = new User();

  user.setName("abc");
  user.setPassword("123456");

  service.signup(user, function(err, result) {
    console.log(err);
    console.log(result);
  });
}

service_signup();
