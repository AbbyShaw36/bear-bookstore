var cookie = require("cookie");
var User = require("../model/user").User;
var page = require("../service/page_admin");

exports.signin = function(req, res, cb) {
  page.signin(cb);
};

exports.index = function(req, res, cb) {
  page.index(cb);
};
